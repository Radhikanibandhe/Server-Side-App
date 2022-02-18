import { IsNotEmpty } from 'class-validator';
// data transfer object
// which is used to transfer data from one to another entity
export class CreateTaskDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
