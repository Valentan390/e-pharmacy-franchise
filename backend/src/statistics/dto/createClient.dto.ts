import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  Matches,
  MinLength,
  MaxLength,
  IsNumber,
  Min,
  IsDate,
} from 'class-validator';
import { phoneRegexp } from 'src/constants/shop';
import { emailRegexp } from 'src/constants/users';

export class CreateClientDto {
  @IsOptional()
  @IsString()
  photo?: string;

  @IsNotEmpty({ message: 'Name is required.' })
  @IsString({ message: 'Name must be a string.' })
  @MinLength(2, { message: 'Name must be at least 2 characters long.' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters.' })
  name: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Invalid email format.' })
  @Matches(emailRegexp, { message: 'Email must be a valid format.' })
  email: string;

  @IsNotEmpty({ message: 'Spent is required.' })
  @IsNumber({}, { message: 'Spent must be a number.' })
  @Min(0, { message: 'Spent must be greater than or equal to 0.' })
  spent: number;

  @IsNotEmpty({ message: 'Phone is required.' })
  @Matches(phoneRegexp, { message: 'Phone must be a valid phone number.' })
  phone: string;

  @IsOptional()
  @IsString({ message: 'Address must be a string.' })
  @MaxLength(200, { message: 'Address must not exceed 200 characters.' })
  address?: string;

  @IsNotEmpty({ message: 'Register date is required.' })
  @IsDate({ message: 'Register date must be a valid date.' })
  register_date: Date;
}
