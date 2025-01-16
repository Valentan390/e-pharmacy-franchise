import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from './schemas/User.shema';
import { handleSaveError, setUpdateSettings } from './schemas/hooks';
import {
  Session,
  SessionDocument,
  SessionSchema,
} from './schemas/Session.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          UserSchema.post('save', handleSaveError<UserDocument>);
          UserSchema.pre('findOneAndUpdate', setUpdateSettings<UserDocument>);
          UserSchema.post('findOneAndUpdate', handleSaveError<UserDocument>);
          return UserSchema;
        },
      },
      {
        name: Session.name,
        useFactory: () => {
          SessionSchema.post('save', handleSaveError<SessionDocument>);
          SessionSchema.pre(
            'findOneAndUpdate',
            setUpdateSettings<SessionDocument>,
          );
          SessionSchema.post(
            'findOneAndUpdate',
            handleSaveError<SessionDocument>,
          );
          return SessionSchema;
        },
      },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
