import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    // buat query builder, lalu ambil dari enpoint task
    const query = this.createQueryBuilder('task');
    // desctructure filternya
    const { status, search } = filterDto;

    // cek jika statusnya true
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      // to lower case
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    }
    // ambil query nya
    const tasks = await query.getMany();
    return tasks;
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
