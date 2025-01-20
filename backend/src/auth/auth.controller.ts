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

@Controller('api/user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
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
  async verify(@Query(new ValidationPipe()) query: VerifyTokenDto) {
    await this.authService.verify(query.token);

    return { status: HttpStatus.OK, message: 'User successfully verified' };
  }

  @Post('login')
  async signin(
    @Body(new EmptyBodyPipe(), new ValidationPipe({ whitelist: true }))
    body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const session = await this.authService.loginUser(body);

    setupSession(res, session);

    return {
      status: HttpStatus.CREATED,
      message: 'Successfully loggin user!',
      data: { accessToken: session.accessToken },
    };
  }

  @Post('logout')
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
  async useкInformation(@Req() req: Request) {
    const user = await this.authService.userInfo({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });

    return {
      //   status: HttpStatus.OK,
      //   message: 'User successfully found',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        verify: user.verify,
      },
    };
  }
}
