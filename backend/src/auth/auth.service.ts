import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

export interface IRegisterUser {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async registerUser(payload: IRegisterUser) {
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
}
