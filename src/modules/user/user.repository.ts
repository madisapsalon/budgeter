import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async addUser(user: User) {
    const { email, password } = user;
    const newUser = new User();
    newUser.email = email;
    newUser.password = password;

    await newUser.save();

    return newUser;
  }
}
