import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { phoneRegexp } from 'src/constants/shop';
import { emailRegexp } from 'src/constants/users';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ versionKey: false, timestamps: true })
export class Client {
  _id: string;

  @Prop({ type: String, default: '', required: false })
  photo: string;

  @Prop({ type: String, minlength: 2, maxlength: 100, required: true })
  name: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
    match: emailRegexp,
  })
  email: string;

  @Prop({ type: Number, min: 0, required: true, default: 0 })
  spent: number;

  @Prop({
    type: String,
    required: true,
    match: phoneRegexp,
  })
  phone: string;

  @Prop({ type: String, maxlength: 200, default: '', required: false })
  address: string;

  @Prop({ type: Date, required: true })
  register_date: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
