import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PatchUserDto } from './dto/patch-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async addUser(authCredentials: AuthCredentialsDto): Promise<string> {
    const { email, password } = authCredentials;

    const newUser = new User();
    newUser.email = email;
    newUser.salt = await bcrypt.genSalt();
    newUser.password = await this.hashPassword(password, newUser.salt);

    try {
      await newUser.save();
      return 'New user created';
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(`Email (${email}) is already in use`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getUser(id: string) {
    return await this.findOne(id);
  }

  async getUserByEmail(email: string) {
    return await this.findOne({ email });
  }

  async updateUser(newUserData: PatchUserDto, userToUpdate: User) {
    if (newUserData.newName) { userToUpdate.name = newUserData.newName; }
    if (newUserData.newEmail) { userToUpdate.email = newUserData.newEmail; }
    return await userToUpdate.save();
  }

  async validateUser(authCredentials: AuthCredentialsDto) {
    const { email, password } = authCredentials;
    const user = await this.findOne({ email });

    if (user && await user.validatePassword(password)) {
      return { email: user.email, id: user.id, name: user.name };
    } else {
      return null;
    }
  }

  protected async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async deleteUser(userId: string) {
    return await this.delete({ id: userId });
  }
}
