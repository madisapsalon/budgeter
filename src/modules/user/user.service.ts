import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

export type User = any;

@Injectable()
export class UserService {

  constructor(private userRepository: UserRepository) {}

  signUpUser(user: AuthCredentialsDto): Promise<void> {
    return this.userRepository.addUser(user);
  }
}
