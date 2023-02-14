import { Injectable } from '@nestjs/common';
import { TaskModel, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: TaskModel[] = [];
  private taskResult: TaskModel;

  getAllTasks(): TaskModel[] {
    return this.tasks;
  }

  getDetailTask(id: string): TaskModel {
    this.tasks.map((task) => {
      if (task.id === id) {
        this.taskResult = task;
      }
    });

    return this.taskResult;
  }

  createTask(createTaskDTO: CreateTaskDto): TaskModel {
    // spred parameter
    const { title, description } = createTaskDTO;
    // simpan form json e dalam objek
    const task: TaskModel = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.DONE,
    };

    // push datanya ke array
    this.tasks.push(task);

    // return nilai yang dikirim
    return task;
  }
}
