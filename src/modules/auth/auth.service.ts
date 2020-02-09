import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from '../user/dto/auth-credentials.dto';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  signUpUser(authCredentials: AuthCredentialsDto): Promise<void> {
    return this.userRepository.addUser(authCredentials);
  }

  signInUser(authCredentials: AuthCredentialsDto) {
    return this.userRepository.validateUser(authCredentials);
  }

  async login(user) {
    const payload = { id: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
