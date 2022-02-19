import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository]), UserModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
