import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './dto/authDto';
import { setupSession } from 'src/utils/setupSession';
import { Request, Response } from 'express';

@Controller('auth/user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async signup(@Body() body: authDto) {
    await this.authService.registerUser(body);

    return {
      status: HttpStatus.CREATED,
      message: 'Successffuly register user!',
    };
  }

  @Post('login')
  async signin(
    @Body() body: authDto,
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
    @Req() req: Request,
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
}
