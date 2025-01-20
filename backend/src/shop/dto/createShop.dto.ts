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
import { phoneRegexp, urlRegexp, zipCodeRegexp } from 'src/constants/shop';

export class CreateShopDto {
  @IsNotEmpty({ message: 'ShopName is required.' })
  @IsString({ message: 'ShopName must be a string.' })
  @MinLength(2, { message: 'ShopName must be at least 2 characters long.' })
  @MaxLength(50, { message: 'ShopName must not exceed 50 characters.' })
  shopName: string;

  @IsNotEmpty({ message: 'OwnerName is required.' })
  @IsString({ message: 'OwnerName must be a string.' })
  @MinLength(2, { message: 'OwnerName must be at least 2 characters long.' })
  @MaxLength(50, { message: 'OwnerName must not exceed 50 characters.' })
  ownerName: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;

  @IsNotEmpty({ message: 'Phone is required.' })
  @Matches(phoneRegexp, {
    message: 'Phone must match the required format (e.g., 097-333-88-87).',
  })
  phone: string;

  @IsNotEmpty({ message: 'Street is required.' })
  @IsString({ message: 'Street must be a string.' })
  @MinLength(2, { message: 'Street must be at least 2 characters long.' })
  @MaxLength(100, { message: 'Street must not exceed 100 characters.' })
  street: string;

  @IsNotEmpty({ message: 'City is required.' })
  @IsString({ message: 'City must be a string.' })
  @MinLength(2, { message: 'City must be at least 2 characters long.' })
  @MaxLength(50, { message: 'City must not exceed 50 characters.' })
  city: string;

  @IsNotEmpty({ message: 'Zip/Postal code is required.' })
  @Matches(zipCodeRegexp, {
    message:
      'Zip/Postal code must match the required format (e.g., 12345 or 12345-6789).',
  })
  zipPostal: string;

  @IsOptional()
  @Matches(urlRegexp, {
    message: 'Logo URL must be a valid URL starting with http or https.',
  })
  logo?: string;

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
