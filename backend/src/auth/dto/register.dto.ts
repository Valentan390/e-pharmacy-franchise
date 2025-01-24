import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { phoneRegexp } from 'src/constants/shop';
import { emailRegexp } from 'src/constants/users';

export class RegisterDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
    minLength: 3,
    maxLength: 20,
  })
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(20, { message: 'Username must not exceed 20 characters' })
  username: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
    pattern: emailRegexp.source,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(emailRegexp, {
    message: 'Email does not match the required pattern',
  })
  email: string;

  @ApiProperty({
    description:
      'The phone number of the user in the format (e.g., 097-333-88-87)',
    example: '097-333-88-87',
    pattern: phoneRegexp.source,
  })
  @IsNotEmpty({ message: 'Phone is required.' })
  @Matches(phoneRegexp, {
    message: 'Phone must match the required format (e.g., 097-333-88-87).',
  })
  phone: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'SecurePass123',
    minLength: 6,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
