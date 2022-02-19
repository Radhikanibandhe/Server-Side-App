import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { UserEntity } from './user.entity';
import * as crypto from 'crypto-js';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signup(authCredentialsDto: AuthCredentialsDTO) {
    const user = new UserEntity();
    // create row for user table
    user.username = authCredentialsDto.username;
    // encrypt the password
    user.password = `${crypto.MD5(authCredentialsDto.password)}`;
    //commit
    await user.save();
  }

  async signin(authCredentialsDto: AuthCredentialsDTO) {
    const { username, password } = authCredentialsDto;

    // check user by username
    const user = await this.findOne({ username });

    // check if user exists
    if (user && user.validatePassword(password)) {
      return true;
    }
    return false;
  }
}
