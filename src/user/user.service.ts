import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async signup(authCredentialsDto: AuthCredentialsDTO) {
    return this.userRepository.signup(authCredentialsDto);
  }

  async signin(authCredentialsDto: AuthCredentialsDTO) {
    const result = this.userRepository.signin(authCredentialsDto);
    if (!result) {
      throw new NotFoundException('user not found');
    }
    return { username: authCredentialsDto };
  }
}
