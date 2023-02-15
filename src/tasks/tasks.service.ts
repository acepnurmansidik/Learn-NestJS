import { Injectable } from '@nestjs/common';
import { TaskModel, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskFilter } from './dto/filter.dto';

@Injectable()
export class TasksService {
  private tasks: TaskModel[] = [];

  getAllTasks(): TaskModel[] {
    return this.tasks;
  }

  getAllTaskWithFilter(filterQuery: TaskFilter): TaskModel[] {
    // destructure
    const { search, status } = filterQuery;
    let newTask = this.getAllTasks();

    if (status) {
      newTask = newTask.filter((task) => task.status !== status);
    }

    if (search) {
      newTask = newTask.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return newTask;
  }

  getDetailTask(id: string): TaskModel {
    return this.tasks.find((rs) => rs.id === id);
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

  destroyTask(id: string): TaskModel {
    const newTask = this.tasks.find((itemTask) => itemTask.id == id);
    this.tasks = this.tasks.filter((itemTask) => itemTask.id != id);
    return newTask;
  }

  updateTask(id: string, updateTask: CreateTaskDto): TaskModel {
    // rest parameter
    const task = this.getDetailTask(id);
    task.title = updateTask.title;
    task.description = updateTask.description;

    return task;
  }
}
