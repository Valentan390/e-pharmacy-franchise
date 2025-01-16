import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type SessionDocument = HydratedDocument<Session>;

@Schema({ versionKey: false, timestamps: true })
export class Session {
  _id?: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  userId: ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  accessToken: string;

  @Prop({
    type: String,
    required: true,
  })
  refreshToken: string;

  @Prop({
    type: Date,
    required: true,
  })
  accessTokenValidUntil: Date;

  @Prop({
    type: Date,
    required: true,
  })
  refreshTokenValidUntil: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
