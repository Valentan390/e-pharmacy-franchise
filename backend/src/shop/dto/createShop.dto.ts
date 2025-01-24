import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  Matches,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { phoneRegexp, urlRegexp, zipCodeRegexp } from 'src/constants/shop';

export class CreateShopDto {
  @ApiProperty({
    description: 'The name of the shop.',
    example: 'Awesome Shop',
    minLength: 2,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'ShopName is required.' })
  @IsString({ message: 'ShopName must be a string.' })
  @MinLength(2, { message: 'ShopName must be at least 2 characters long.' })
  @MaxLength(50, { message: 'ShopName must not exceed 50 characters.' })
  shopName: string;

  @ApiProperty({
    description: 'The name of the shop owner.',
    example: 'John Doe',
    minLength: 2,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'OwnerName is required.' })
  @IsString({ message: 'OwnerName must be a string.' })
  @MinLength(2, { message: 'OwnerName must be at least 2 characters long.' })
  @MaxLength(50, { message: 'OwnerName must not exceed 50 characters.' })
  ownerName: string;

  @ApiProperty({
    description: 'The email address of the shop.',
    example: 'shop@example.com',
  })
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;

  @ApiProperty({
    description: 'The phone number of the shop.',
    example: '097-333-88-87',
  })
  @IsNotEmpty({ message: 'Phone is required.' })
  @Matches(phoneRegexp, {
    message: 'Phone must match the required format (e.g., 097-333-88-87).',
  })
  phone: string;

  @ApiProperty({
    description: 'The street address of the shop.',
    example: '123 Main Street',
    minLength: 2,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'Street is required.' })
  @IsString({ message: 'Street must be a string.' })
  @MinLength(2, { message: 'Street must be at least 2 characters long.' })
  @MaxLength(100, { message: 'Street must not exceed 100 characters.' })
  street: string;

  @ApiProperty({
    description: 'The city where the shop is located.',
    example: 'New York',
    minLength: 2,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'City is required.' })
  @IsString({ message: 'City must be a string.' })
  @MinLength(2, { message: 'City must be at least 2 characters long.' })
  @MaxLength(50, { message: 'City must not exceed 50 characters.' })
  city: string;

  @ApiProperty({
    description: 'The zip or postal code of the shop.',
    example: '12345-6789',
  })
  @IsNotEmpty({ message: 'Zip/Postal code is required.' })
  @Matches(zipCodeRegexp, {
    message:
      'Zip/Postal code must match the required format (e.g., 12345 or 12345-6789).',
  })
  zipPostal: string;

  @ApiPropertyOptional({
    description: 'The logo of the shop as a file.',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  logo?: Express.Multer.File;

  @ApiProperty({
    description: 'Indicates whether the shop has its own delivery system.',
    example: true,
  })
  @IsNotEmpty({ message: 'OwnDeliverySystem is required.' })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return value;
  })
  @IsBoolean({ message: 'OwnDeliverySystem must be a boolean value.' })
  ownDeliverySystem: boolean;
}
