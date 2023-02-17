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
  // createTask(createTaskDTO: CreateTaskDto): TaskModel {
  //   // spred parameter
  //   const { title, description } = createTaskDTO;
  //   // simpan form json e dalam objek
  //   const task: TaskModel = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.DONE,
  //   };
  //   // push datanya ke array
  //   this.tasks.push(task);
  //   // return nilai yang dikirim
  //   return task;
  // }
  // destroyTask(id: string): TaskModel {
  //   const newTask = this.tasks.find((itemTask) => itemTask.id == id);
  //   this.tasks = this.tasks.filter((itemTask) => itemTask.id != id);
  //   return newTask;
  // }
  // updateTask(id: string, status: TaskStatus): TaskModel {
  //   // rest parameter
  //   const task = this.getDetailTask(id);
  //   task.status = status;
  //   return task;
  // }
}
