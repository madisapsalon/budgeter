import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

export type User = any;

@Injectable()
export class UserService {

  constructor(private userRepository: UserRepository) {}

  signUpUser(user: User) {
    return this.userRepository.addUser(user);
  }
}
