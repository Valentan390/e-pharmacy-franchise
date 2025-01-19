import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { emailRegexp } from 'src/constants/users';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
export class User {
  _id: ObjectId;

  @Prop({ type: String, required: true })
  username: string;

  @Prop({
    type: String,
    match: emailRegexp,
    unique: true,
    required: true,
  })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({
    type: Boolean,
    default: false,
    required: true,
  })
  verify: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
