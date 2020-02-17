import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { GetUser } from './get-user.decorator';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  @Get('/profile')
  getProfile(@GetUser() user: User) {
    return user;
  }

}
