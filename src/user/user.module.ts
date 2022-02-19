import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]),
  // for JWT
  JwtModule.register({
    secret: 'secret',
    signOptions: {
      expiresIn: 3600,
    },

  }),

  // for passport 
  PassportModule.register({
    defaultStrategy: 'jwt',
  })],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
