import { BadRequestException, Body, Controller, Get, Patch, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { GetUser } from './get-user.decorator';
import { PatchUserDto } from './dto/patch-user.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
  ) { }

  @Get()
  getUser(@GetUser() user: User) {
    const { id } = user;
    return this.userService.getUser(id);
  }

  @Patch()
  async updateUser(
    @Body(new ValidationPipe()) newUserData: PatchUserDto,
    @GetUser() user: User,
  ) {
    if (!newUserData.newEmail && !newUserData.newName) {
      throw new BadRequestException('One of body properties is expected: newEmail or newName');
    }

    const userId = user.id;
    return await this.userService.updateUser(newUserData, userId);
  }

}
