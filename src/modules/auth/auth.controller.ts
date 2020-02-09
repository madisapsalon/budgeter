import { Body, Controller, Post, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from '../user/dto/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { AuthValidationPipe } from './auth-validation.pipe';

@Controller()
export class AuthController {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) { }

  @Post('/signup')
  signUp(@Body(new AuthValidationPipe()) user: AuthCredentialsDto): Promise<void> {
    return this.authService.signUpUser(user);
  }

  @Post('/signin')
  async signIn(@Body(new AuthValidationPipe()) authCredentials: AuthCredentialsDto) {
    const user = await this.authService.signInUser(authCredentials);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  // Alternative way of signin with passport local strategy
  // @UseGuards(AuthGuard('local'))
  // @Post('/signin')
  // async signIn(@Req() user) {
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }
  //   return this.authService.login(user);
  // }

}
