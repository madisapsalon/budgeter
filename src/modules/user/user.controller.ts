import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  @Post('/signup')
  signUp(@Body() user: User) {
    return this.userService.signUpUser(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  getProfile(@Req() req) {
    return req.user;
  }

}
