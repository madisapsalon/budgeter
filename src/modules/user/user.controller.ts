import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';

@Controller('user')
export class UserController {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  @Post('/signup')
  signUp(
    @Body(
      new ValidationPipe({ validationError: { target: false, value: false } }))
      user: AuthCredentialsDto): Promise<void> {
    return this.userService.signUpUser(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('/signin')
  async signIn(
    @Body(
      new ValidationPipe({ validationError: { target: false, value: false } }))
      authCredentials: AuthCredentialsDto) {
    const user = await this.userService.signInUser(authCredentials);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard())
  @Get('/profile')
  getProfile(@GetUser() user) {
    return user;
  }

}
