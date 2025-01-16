import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signupDto';

@Controller('auth/user')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async signup(@Body() body: SignupDto) {
    await this.authService.registerUser(body);

    return {
      status: HttpStatus.CREATED,
      message: 'Successffuly register user!',
    };
  }
}
