import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { UserRepository } from './user.repository';
import { JwtPayload } from './jwt.payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signup(authCredentialsDto: AuthCredentialsDTO) {
    return this.userRepository.signup(authCredentialsDto);
  }

  async signin(authCredentialsDto: AuthCredentialsDTO) {
    const user = this.userRepository.signin(authCredentialsDto);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    // create the jwt token
    const payload: JwtPayload = {
      username: authCredentialsDto.username,
      id: user.id,
    };

    // create the token
    const token = await this.jwtService.sign(payload);

    // return the token
    return { token };
  }
}
