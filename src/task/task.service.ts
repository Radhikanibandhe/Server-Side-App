import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create.task.dto';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { SearchTaskDTO } from './dto/search.task.dto';

@Injectable()
export class TaskService {
  getTasks(searchTaskDto: SearchTaskDTO) {
    //get the search parameter and status value
    const { search, status } = searchTaskDto;

    // start with all tasks
    let tasks = this.tasks;

    if (search) {
      tasks = tasks.filter((task) => {
        return task.title.includes(search) || task.description.includes(search);
      });
    }

    if (status) {
      tasks = tasks.filter((task) => {
        return task.status == status;
      });
    }

    //return filtered task
    return this.tasks;
  }
  // store all the tasks
  private tasks: Task[] = [];

  // create a new task
  createTask(createTaskDto: CreateTaskDTO) {
    //generate new id
    const newId = uuid.v1();

    // create a new task
    const task: Task = {
      id: newId,
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
    };

    // add this task to the tasks list
    this.tasks.push(task);

    return this.tasks;
  }

  private getTaskById(id: string) {
    const task = this.tasks.find((task) => {
      return task.id == id;
    });

    if (!task) {
      throw new NotFoundException('task not found');
    }

    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string) {
    this.getTaskById(id);
    // delete task matching id
    this.tasks = this.tasks.filter((task) => task.id != id);

    return this.tasks;
  }
}
