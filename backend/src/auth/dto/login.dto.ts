import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { RegisterDto } from './register.dto';

export class LoginDto extends PickType(RegisterDto, [
  'email',
  'password',
] as const) {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'SecurePass123',
  })
  password: string;
}
