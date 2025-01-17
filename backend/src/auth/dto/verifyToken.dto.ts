import { IsNotEmpty } from 'class-validator';

export class VerifyTokenDto {
  @IsNotEmpty({ message: 'Token is required' })
  token: string;
}
