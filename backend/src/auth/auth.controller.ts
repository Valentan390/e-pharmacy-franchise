import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { setupSession } from 'src/utils/setupSession';
import { Request, Response } from 'express';
import { VerifyTokenDto } from './dto/verifyToken.dto';
import { LoginDto } from './dto/login.dto';
import { EmptyBodyPipe } from 'src/common/pipe/emptyBody.pipe';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('api/user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiCreatedResponse({ description: 'Successffuly register user!' })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async signup(
    @Body(new EmptyBodyPipe(), new ValidationPipe({ whitelist: true }))
    body: RegisterDto,
  ) {
    await this.authService.registerUser(body);

    return {
      status: HttpStatus.CREATED,
      message: 'Successffuly register user!',
    };
  }

  @Get('verify')
  @ApiOperation({ summary: 'User email verification' })
  @ApiQuery({
    name: 'token',
    description: 'Verification token',
    required: true,
    type: String,
  })
  @ApiOkResponse({ description: 'User successfully verified' })
  @ApiBadRequestResponse({
    description: 'Invalid token data',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async verify(@Query(new ValidationPipe()) query: VerifyTokenDto) {
    await this.authService.verify(query.token);

    return { status: HttpStatus.OK, message: 'User successfully verified' };
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiCreatedResponse({
    description: 'Successfully loggin user!',
    schema: {
      example: {
        status: 201,
        message: 'Successfully logged in user!',
        data: {
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async signin(
    @Body(new EmptyBodyPipe(), new ValidationPipe({ whitelist: true }))
    body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const session = await this.authService.loginUser(body);

    setupSession(res, session);

    return {
      status: HttpStatus.CREATED,
      message: 'Successfully logged in user!',
      data: { accessToken: session.accessToken },
    };
  }

  @Post('logout')
  @ApiCookieAuth()
  @ApiOperation({
    summary: 'User logout',
    description: 'Logs out the user and clears session cookies.',
  })
  @ApiNoContentResponse({
    description: 'User successfully logout',
    schema: {
      example: {
        status: HttpStatus.NO_CONTENT,
        message: 'User successfully logout',
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Session not found' })
  async signout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { sessionId } = req.cookies;

    if (sessionId) {
      await this.authService.logoutUser(sessionId);

      res.clearCookie('sessionId');
      res.clearCookie('refreshToken');

      return {
        message: 'User successfully logout',
        status: HttpStatus.NO_CONTENT,
      };
    }
    throw new UnauthorizedException('Session not found');
  }

  @Post('refresh')
  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Refresh user session',
    description: 'Refreshes the user session and provides a new access token.',
  })
  @ApiCreatedResponse({
    description: 'Session successfully refreshed.',
    schema: {
      example: {
        status: HttpStatus.CREATED,
        message: 'Session successfully refresh',
        data: { accessToken: 'gjoewn8yun95ng984g9gghoh...' },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized due to missing or invalid session cookies.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request due to invalid data or malformed cookies.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error during session refresh.',
  })
  async refreshSession(
    @Req()
    req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const session = await this.authService.refreshSession({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });

    setupSession(res, session);

    return {
      status: HttpStatus.CREATED,
      message: 'Session successfully refresh',
      data: { accessToken: session.accessToken },
    };
  }

  @Get('user-info')
  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Retrieve user information',
    description: 'Gets user information based on session cookies.',
  })
  @ApiOkResponse({
    description: 'User information retrieved successfully.',
    schema: {
      example: {
        status: HttpStatus.OK,
        message: 'User successfully found',
        user: {
          _id: '64fcb9f51c1234567890abcd',
          username: 'JohnDoe',
          email: 'johndoe@example.com',
          phone: '097-333-88-87',
          verify: true,
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized due to missing or invalid session cookies.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error during user information retrieval.',
  })
  async userInformation(@Req() req: Request) {
    const { sessionId, refreshToken } = req.cookies;

    if (!sessionId || !refreshToken) {
      throw new UnauthorizedException(
        'Session not found or invalid refresh token.',
      );
    }

    const user = await this.authService.userInfo({
      sessionId,
      refreshToken,
    });

    return {
      status: HttpStatus.OK,
      message: 'User successfully found',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        verify: user.verify,
      },
    };
  }
}
