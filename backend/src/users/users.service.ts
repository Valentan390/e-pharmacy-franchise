import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/User.shema';
import { Session } from './schemas/Session.schema';
import { Model } from 'mongoose';
import { IRegisterUser } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Session.name) private sessionModel: Model<Session>,
  ) {}

  async getUser({ email }: { email: string }): Promise<User | null> {
    return await this.userModel.findOne({ email });
  }

  async createUser(payload: IRegisterUser): Promise<User> {
    return await this.userModel.create(payload);
  }
}
