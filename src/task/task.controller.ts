import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create.task.dto';
import { TaskService } from './task.service';
import { SearchTaskDTO } from './dto/search.task.dto';
import { TaskStatus } from './task.model';

@Controller('task')
export class TaskController {
  // dependency injection
  // task controller is dependent on task service
  constructor(private taskService: TaskService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDTO) {
    // 1. generate a new task
    // 2. return all tasks
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  getTask(@Query() searchTaskDto: SearchTaskDTO) {
    return this.taskService.getTasks(searchTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Param('status') status: TaskStatus,
  ) {
    return this.taskService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
