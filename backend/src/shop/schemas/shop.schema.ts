import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { phoneRegexp, urlRegexp, zipCodeRegexp } from 'src/constants/shop';
import { emailRegexp } from 'src/constants/users';

export type ShopDocument = HydratedDocument<Shop>;

@Schema({ versionKey: false, timestamps: true })
export class Shop {
  @ApiProperty({
    description: 'Unique identifier of the shop',
    example: '643f1bc8b7f4a2d4e987c29d',
  })
  _id?: string;

  @ApiProperty({
    description: 'The name of the shop',
    example: 'My Awesome Shop',
    minLength: 2,
    maxLength: 50,
  })
  @Prop({ type: String, minlength: 2, maxlength: 50, required: true })
  shopName: string;

  @ApiProperty({
    description: 'The name of the shop owner',
    example: 'John Doe',
    minLength: 2,
    maxLength: 50,
  })
  @Prop({ type: String, minlength: 2, maxlength: 50, required: true })
  ownerName: string;

  @ApiProperty({
    description: 'The email address of the shop',
    example: 'shop@example.com',
    format: 'email',
  })
  @Prop({ type: String, match: emailRegexp, required: true, unique: true })
  email: string;

  @ApiProperty({
    description: 'The phone number of the shop',
    example: '097-123-45-67',
    pattern: phoneRegexp.source,
  })
  @Prop({ type: String, match: phoneRegexp, required: true, unique: true })
  phone: string;

  @ApiProperty({
    description: 'The street address of the shop',
    example: '123 Main St',
    minLength: 2,
    maxLength: 100,
  })
  @Prop({ type: String, minlength: 2, maxlength: 100, required: true })
  street: string;

  @ApiProperty({
    description: 'The city where the shop is located',
    example: 'New York',
    minLength: 2,
    maxLength: 50,
  })
  @Prop({ type: String, minlength: 2, maxlength: 50, required: true })
  city: string;

  @ApiProperty({
    description: 'The postal or zip code of the shop',
    example: '10001',
    pattern: zipCodeRegexp.source,
  })
  @Prop({ type: String, match: zipCodeRegexp, required: true })
  zipPostal: string;

  @ApiProperty({
    description: 'The URL of the shop logo',
    example: 'http://example.com/uploads/shop-logo.jpg',
    format: 'url',
  })
  @Prop({ type: String, match: urlRegexp, default: '', required: false })
  logo: string;

  @ApiProperty({
    description: 'Indicates if the shop has its own delivery system',
    example: true,
  })
  @Prop({ type: Boolean, default: false, required: true })
  ownDeliverySystem: boolean;

  @ApiProperty({
    description: 'The ID of the user who owns the shop',
    example: '643f1bc8b7f4a2d4e987c29c',
  })
  @Prop({ type: String, ref: 'User', unique: true })
  userId: string;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
