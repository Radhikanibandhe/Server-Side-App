import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfiguration } from './config/typeorm.config';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { JwtStrategy } from './user/jwt.strategy';

@Module({
  imports: [
    TaskModule,
    UserModule,
    TypeOrmModule.forRoot(TypeORMConfiguration),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class AppModule {}
