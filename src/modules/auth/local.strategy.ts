import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthCredentialsDto } from '../user/dto/auth-credentials.dto';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({usernameField: 'email'});
  }

  async validate(email: string, password: string): Promise<any> {
    const authCredentials: AuthCredentialsDto = { email, password };
    const user = this.userRepository.validateUser(authCredentials);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
