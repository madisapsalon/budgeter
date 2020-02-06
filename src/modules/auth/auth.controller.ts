import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

interface User {
  username: string;
  password: string;
}

@Controller()
export class AuthController {

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('/signup')
  signUp(@Body() user: User) {
    return this.userService.signUpUser(user);
  }
}
