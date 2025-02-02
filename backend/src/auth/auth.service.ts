import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { createSession } from 'src/utils/createSession';
import { JwtService } from '@nestjs/jwt';
import { TEMPLATES_DIR } from 'src/constants';
import * as path from 'node:path';
import { readFile } from 'fs/promises';
import * as Handlebars from 'handlebars';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';

export interface IPayload {
  email: string;
  password: string;
}

export interface IVerifyTokenPayload {
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
  ) {}

  async registerUser(payload: IPayload) {
    const { email, password } = payload;

    const user = await this.usersService.getUser({ email });

    if (user) {
      throw new ConflictException('Email already exist');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.createUser({
      ...payload,
      password: hashPassword,
    });

    const verifyEmailTemplatePath = path.join(
      TEMPLATES_DIR,
      'verify-email.html',
    );

    const templateSource = await readFile(verifyEmailTemplatePath, 'utf-8');

    const template = Handlebars.compile(templateSource);

    const appDomain = this.configService.get<string>('APP_DOMAIN');

    const token = await this.jwtService.signAsync({ email });

    const html = template({
      username: newUser.username,
      link: `${appDomain}/api/user/verify?token=${token}`,
    });

    const verifyEmail = {
      to: email,
      subject: 'Підтверження email',
      html,
    };

    await this.mailService.sendMail(verifyEmail);

    return newUser;
  }

  async verify(token: string) {
    const { email } =
      await this.jwtService.verifyAsync<IVerifyTokenPayload>(token);

    if (!email) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const user = await this.usersService.getUser({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.verify) {
      throw new BadRequestException('User already verified');
    }

    await this.usersService.updateUser({ _id: user._id }, { verify: true });
  }

  async loginUser(payload: IPayload) {
    const { email, password } = payload;

    const user = await this.usersService.getUser({ email });

    if (!user) {
      throw new UnauthorizedException('Email or password invalid');
    }

    if (!user.verify) {
      throw new UnauthorizedException('Email not verify');
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw new UnauthorizedException('Email or password invalid');
    }

    await this.usersService.deleteSession({ userId: user._id });

    const newSession = createSession();

    return this.usersService.createSession({
      userId: user._id,
      ...newSession,
    });
  }

  async logoutUser(sessionId: string) {
    return await this.usersService.deleteSession({ _id: sessionId });
  }

  async refreshSession({
    sessionId,
    refreshToken,
  }: {
    sessionId: string;
    refreshToken: string;
  }) {
    const oldSession = await this.usersService.getSession({
      _id: sessionId,
      refreshToken,
    });

    if (!oldSession) {
      throw new UnauthorizedException('Session not found');
    }

    if (Date.now() > oldSession.refreshTokenValidUntil.getTime()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    await this.usersService.deleteSession({ _id: sessionId });

    const newSession = createSession();

    return this.usersService.createSession({
      userId: oldSession.userId,
      ...newSession,
    });
  }

  async userInfo({
    sessionId,
    refreshToken,
  }: {
    sessionId: string;
    refreshToken: string;
  }) {
    const session = await this.usersService.getSession({
      _id: sessionId,
      refreshToken,
    });

    if (!session) {
      throw new UnauthorizedException('Session not found');
    }

    if (Date.now() > session.accessTokenValidUntil.getTime()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    const user = await this.usersService.getUser({ _id: session.userId });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
