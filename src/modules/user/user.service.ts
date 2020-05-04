import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PatchUserDto } from './dto/patch-user.dto';
import { User } from './user.entity';
import { SafeUserDto } from './dto/safe-user.dto';

@Injectable()
export class UserService {

  constructor(private userRepository: UserRepository) {}

  async updateUser(newUserData: PatchUserDto, userId: string) {
    const { newEmail } = newUserData;

    const userToUpdate = await this.userRepository.getUser(userId);
    const newEmailExists = await this.newUserExists(newEmail);

    if (newEmailExists) { throw new ConflictException('The email exists in the system'); }

    const updatedUser = await this.userRepository.updateUser(newUserData, userToUpdate);
    return UserService.extractSafeUserData(updatedUser);
  }

  async getUser(id: string) {
    const user = await this.userRepository.getUser(id);
    return UserService.extractSafeUserData(user);
  }

  private async newUserExists(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    return !!user;
  }

  private static extractSafeUserData(user: User): SafeUserDto {
    const { id, name, email, createdAt, updatedAt } = user;
    return { id, name, email, createdAt, updatedAt };
  }

  async deleteUser(userId: string) {
    // TODO Before delete check if user has any entry
    // if (UserService.userHasEntries()) {
    //   throw new ConflictException('Cannot delete user, because the user has entries');
    // }
    const deleteResult = await this.userRepository.deleteUser(userId);
    if (deleteResult.affected === 1) {
      return { message: 'The user is successfully deleted' };
    }
    return {
      affected: deleteResult.affected,
      message: 'Something went wrong on delete.',
    };
  }

  private static userHasEntries() {
    return true;
  }
}
