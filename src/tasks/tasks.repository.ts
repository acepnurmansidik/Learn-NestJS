import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status.enum';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    // desctructure
    const { title, description } = createTaskDto;

    const tasks = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    // simpan ke database
    await this.save(tasks);
    return tasks;
  }
}
