import { Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './modules/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './modules/users/user.entity';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Get('/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
