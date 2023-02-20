import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private taskRepository: TasksRepository,
  ) {}
  // getAllTasks(): TaskModel[] {
  //   return this.tasks;
  // }
  // getAllTaskWithFilter(filterQuery: TaskFilter): TaskModel[] {
  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id} not found"`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    // desctructure
    const response = await this.taskRepository.createTask(createTaskDto);

    return response;
  }
  async destroyTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete({ id });

    // cek jika id yang di cari tidak ada
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found!`);
    }
  }

  //   // destructure
  //   const { search, status } = filterQuery;
  //   let newTask = this.getAllTasks();
  //   if (status) {
  //     newTask = newTask.filter((task) => task.status !== status);
  //   }
  //   if (search) {
  //     newTask = newTask.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return newTask;
  // }
  // getDetailTask(id: string): TaskModel {
  //   return this.tasks.find((rs) => rs.id === id);
  // }

  // updateTask(id: string, status: TaskStatus): TaskModel {
  //   // rest parameter
  //   const task = this.getDetailTask(id);
  //   task.status = status;
  //   return task;
  // }
}
