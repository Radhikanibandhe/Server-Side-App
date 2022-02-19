import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as crypto from 'crypto-js';

@Entity('User')
@Unique(['username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  async validatePassword(password: string) {
    const encrypt = `${crypto.MD5(password)}`;

    return encrypt == this.password;
  }
}
