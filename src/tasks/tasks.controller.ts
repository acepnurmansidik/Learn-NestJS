import { TaskFilter } from './dto/filter.dto';
import { TaskModel } from './tasks.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterQuery: TaskFilter): TaskModel[] {
    if (Object.keys(filterQuery).length) {
      return this.tasksService.getAllTaskWithFilter(filterQuery);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getDetailTask(@Param('id') id: string) {
    // jika id nya ada
    const found = this.tasksService.getDetailTask(id);
    // jika tidak ada kirim response 404
    if (!found) {
      throw new NotFoundException(`Task with "${id}" not found`);
    }

    return found;
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

  @Patch('/:id')
  updateByID(
    @Param('id') id: string,
    @Body() updateTask: CreateTaskDto,
  ): TaskModel {
    return this.tasksService.updateTask(id, updateTask);
  }
}
