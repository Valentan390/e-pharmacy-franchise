import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { phoneRegexp } from 'src/constants/shop';
import { emailRegexp } from 'src/constants/users';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ versionKey: false, timestamps: true })
export class Client {
  @ApiProperty({
    description: 'Unique identifier of the client.',
    example: '63f7b5c4e43e1a7d8cfc1234',
  })
  _id: string;

  @ApiProperty({
    description: 'URL of the client photo.',
    example: 'https://example.com/images/client123.jpg',
    required: false,
  })
  @Prop({ type: String, default: '', required: false })
  photo: string;

  @ApiProperty({
    description: 'Full name of the client.',
    example: 'John Doe',
  })
  @Prop({ type: String, minlength: 2, maxlength: 100, required: true })
  name: string;

  @ApiProperty({
    description: 'Email address of the client.',
    example: 'john.doe@example.com',
    required: true,
  })
  @Prop({
    type: String,
    unique: true,
    required: true,
    match: emailRegexp,
  })
  email: string;

  @ApiProperty({
    description: 'Total amount spent by the client.',
    example: 250.5,
    minimum: 0,
    default: 0,
  })
  @Prop({ type: Number, min: 0, required: true, default: 0 })
  spent: number;

  @ApiProperty({
    description: 'Phone number of the client.',
    example: '+1234567890',
  })
  @Prop({
    type: String,
    required: true,
    match: phoneRegexp,
  })
  phone: string;

  @ApiProperty({
    description: 'Address of the client.',
    example: '123 Main St, Springfield',
    maxLength: 200,
    required: false,
  })
  @Prop({ type: String, maxlength: 200, default: '', required: false })
  address: string;

  @ApiProperty({
    description: 'Date when the client registered.',
    example: '2023-01-15T00:00:00.000Z',
  })
  @Prop({ type: Date, required: true })
  register_date: Date;

  @ApiProperty({
    description: 'Unique identifier of the user associated with the client.',
    example: '63f7b5c4e43e1a7d8cfc5678',
  })
  @Prop({ type: String, required: true, unique: true })
  userId: string;

  @ApiProperty({
    description: 'Unique identifier of the shop associated with the client.',
    example: '63f7b5c4e43e1a7d8cfc9101',
  })
  @Prop({ type: String, required: true, unique: true })
  shopId: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
