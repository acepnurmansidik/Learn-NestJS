import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  destroyTaskByID(@Param('id') id: string): Promise<void> {
    return this.tasksService.destroyTask(id);
  }

  @Patch('/:id/status')
  updateByID(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }

  // @Get('/:id')
  // getDetailTask(@Param('id') id: string) {
  //   // jika id nya ada
  //   const found = this.tasksService.getDetailTask(id);
  //   // jika tidak ada kirim response 404
  //   if (!found) {
  //     throw new NotFoundException(`Task with "${id}" not found`);
  //   }

  //   return found;
  // }
}
