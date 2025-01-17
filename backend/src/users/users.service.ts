import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/User.shema';
import { Session } from './schemas/Session.schema';
import { Model, ObjectId, RootFilterQuery, UpdateQuery } from 'mongoose';
import { IPayload } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Session.name) private sessionModel: Model<Session>,
  ) {}

  async getUser({ email }: { email: string }): Promise<User | null> {
    return await this.userModel.findOne({ email });
  }

  async createUser(payload: IPayload): Promise<User> {
    return await this.userModel.create(payload);
  }

  async deleteSession(data: { userId?: ObjectId; _id?: ObjectId }) {
    return await this.sessionModel.deleteOne(data);
  }

  async createSession(data: Session): Promise<Session> {
    return await this.sessionModel.create(data);
  }

  async getSession(filter: {
    _id: ObjectId;
    refreshToken: string;
  }): Promise<Session> {
    return await this.sessionModel.findOne(filter);
  }

  async updateUser(
    filter: RootFilterQuery<User>,
    update: UpdateQuery<User>,
  ): Promise<void> {
    await this.userModel.findOneAndUpdate(filter, update);
  }
}
