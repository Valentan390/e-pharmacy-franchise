import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { urlRegexp } from 'src/constants/shop';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ versionKey: false, timestamps: true })
export class Product {
  _id?: string;

  @Prop({ type: String, match: urlRegexp, default: '' })
  photo?: string;

  @Prop({ type: String, minlength: 2, maxlength: 50, required: true })
  name: string;

  @Prop({
    type: String,
    default: '',
  })
  suppliers?: string;

  @Prop({
    type: String,
    default: '',
  })
  stock?: string;

  @Prop({ type: String, minlength: 1, maxlength: 10, required: true })
  price: string;

  @Prop({
    type: String,
    default: '',
  })
  category?: string;

  @Prop({ type: String, ref: 'User', required: true })
  userId: string;

  @Prop({ type: String, ref: 'Shop', required: true })
  shopId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
