import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UserService {

  signUpUser(user: User) {
    return user;
  }
}
