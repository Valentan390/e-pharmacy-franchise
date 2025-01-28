import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { urlRegexp } from 'src/constants/shop';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ versionKey: false, timestamps: true })
export class Product {
  @ApiProperty({
    description: 'Unique identifier of the product',
    example: '640c1bb2f5e84b32a1b59d6c',
  })
  _id?: string;

  @ApiProperty({
    description: 'URL of the product photo',
    example: 'https://example.com/product.jpg',
    pattern: urlRegexp.source,
    default: '',
  })
  @Prop({ type: String, match: urlRegexp, default: '' })
  photo?: string;

  @ApiProperty({
    description: 'Name of the product',
    example: 'Organic Honey',
    minLength: 2,
    maxLength: 50,
    required: true,
  })
  @Prop({ type: String, minlength: 2, maxlength: 50, required: true })
  name: string;

  @ApiProperty({
    description: 'Name of the product suppliers',
    example: 'Acme Inc.',
    default: '',
  })
  @Prop({
    type: String,
    default: '',
  })
  suppliers?: string;

  @ApiProperty({
    description: 'Stock status or quantity',
    example: 'In Stock',
    default: '',
  })
  @Prop({
    type: String,
    default: '',
  })
  stock?: string;

  @ApiProperty({
    description: 'Price of the product',
    example: '19.99',
    minLength: 1,
    maxLength: 10,
    required: true,
  })
  @Prop({ type: String, minlength: 1, maxlength: 10, required: true })
  price: string;

  @ApiProperty({
    description: 'Category of the product',
    example: 'Food & Beverages',
    default: '',
  })
  @Prop({
    type: String,
    default: '',
  })
  category?: string;

  @ApiProperty({
    description: 'ID of the user who owns the product',
    example: '640c1aa2b5e24c32a1b59d6c',
    required: true,
  })
  @Prop({ type: String, ref: 'User', required: true })
  userId: string;

  @ApiProperty({
    description: 'ID of the shop associated with the product',
    example: '640c1bb2c5e84b32a1b59d6c',
    required: true,
  })
  @Prop({ type: String, ref: 'Shop', required: true })
  shopId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
