import { TaskStatus } from '../task.model';
// data transfer object
// which is used to transfer data from one to another entity
export class SearchTaskDTO {
  search: string;
  status: TaskStatus;
}
