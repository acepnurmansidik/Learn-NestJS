import { TaskModel } from './tasks.model';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): TaskModel[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getDetailTask(@Param('id') id: string) {
    return this.tasksService.getDetailTask(id);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDto): TaskModel {
    // ambil body yang dikirim dari FE
    return this.tasksService.createTask(createTaskDTO);
  }

  @Delete('/:id')
  destroyTaskByID(@Param('id') id: string): TaskModel {
    return this.tasksService.destroyTask(id);
  }
}
