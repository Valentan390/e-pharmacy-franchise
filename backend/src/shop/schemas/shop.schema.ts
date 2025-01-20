import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { phoneRegexp, urlRegexp, zipCodeRegexp } from 'src/constants/shop';
import { emailRegexp } from 'src/constants/users';

export type ShopDocument = HydratedDocument<Shop>;

@Schema({ versionKey: false, timestamps: true })
export class Shop {
  _id?: ObjectId;

  @Prop({ type: String, minlength: 2, maxlength: 50, required: true })
  shopName: string;

  @Prop({ type: String, minlength: 2, maxlength: 50, required: true })
  ownerName: string;

  @Prop({ type: String, match: emailRegexp, required: true, unique: true })
  email: string;

  @Prop({ type: String, match: phoneRegexp, required: true, unique: true })
  phone: string;

  @Prop({ type: String, minlength: 2, maxlength: 100, required: true })
  street: string;

  @Prop({ type: String, minlength: 2, maxlength: 50, required: true })
  city: string;

  @Prop({ type: String, match: zipCodeRegexp, required: true })
  zipPostal: string;

  @Prop({ type: String, match: urlRegexp, default: '', required: false })
  logo: string;

  @Prop({ type: Boolean, default: false, required: true })
  ownDeliverySystem: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true })
  userId: ObjectId;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
