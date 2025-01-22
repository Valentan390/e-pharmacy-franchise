import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
  IsString,
  MaxLength,
} from 'class-validator';
import { phoneRegexp } from 'src/constants/shop';
import { emailRegexp } from 'src/constants/users';

export class RegisterDto {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(20, { message: 'Username must not exceed 20 characters' })
  username: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(emailRegexp, {
    message: 'Email does not match the required pattern',
  })
  email: string;

  @IsNotEmpty({ message: 'Phone is required.' })
  @Matches(phoneRegexp, {
    message: 'Phone must match the required format (e.g., 097-333-88-87).',
  })
  phone: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
