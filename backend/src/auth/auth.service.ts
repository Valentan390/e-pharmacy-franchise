import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { createSession } from 'src/utils/createSession';
import { ObjectId } from 'mongoose';

export interface IPayload {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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

    return newUser;
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

  async logoutUser(sessionId: ObjectId) {
    return await this.usersService.deleteSession({ _id: sessionId });
  }

  async refreshSession({
    sessionId,
    refreshToken,
  }: {
    sessionId: ObjectId;
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
}
