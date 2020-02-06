import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {

  constructor(
    // private authService: AuthService,
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
