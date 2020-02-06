import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    // @InjectRepository(User)
    // private userRepository: Repository<User>,
    private readonly appService: AppService,
  ) {}

  // @Get('/:id')
  // async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
  //   return await this.userRepository.findOne(id);
  // }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
