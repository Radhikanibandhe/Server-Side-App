import { EntityRepository, Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDTO } from './dto/create.task.dto';
import { TaskStatus } from './task.enum';
import { SearchTaskDTO } from './dto/search.task.dto';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  async createTask(createTaskDto: CreateTaskDTO) {
    // create a row in the task table (TaskEntity)
    const task = new TaskEntity();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = TaskStatus.OPEN;

    // create a new row in task table
    await task.save();

    return task;
  }

  async getTasks(searchTaskDTO: SearchTaskDTO) {
    const tasks = await this.find();
    const { search, status } = searchTaskDTO;

    // search by status
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status: status });
    }

    // search by title and description
    if (search) {
      query.andWhere(
        `(task.title LIKE :search) OR (task.description LIKE :search)`,
        { search: `%${search}%` },
      );
    }
    // to get many rows
    return await query.getMany();
  }
}
