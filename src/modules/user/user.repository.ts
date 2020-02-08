import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async addUser(user: AuthCredentialsDto): Promise<void> {
    const { email, password } = user;

    const newUser = new User();
    newUser.email = email;
    newUser.salt = await bcrypt.genSalt();
    newUser.password = await this.hashPassword(password, newUser.salt);

    try {
      await newUser.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(`Email (${email}) is already in use`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  protected async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

}
