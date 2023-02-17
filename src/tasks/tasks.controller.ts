import { TaskStatus } from './tasks-status.enum';
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
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getAllTasks(@Query() getFilterDto: GetTaskFilterDto): TaskModel[] {
  //   if (Object.keys(getFilterDto).length) {
  //     return this.tasksService.getAllTaskWithFilter(getFilterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

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

  // @Post()
  // createTask(@Body() createTaskDTO: CreateTaskDto): TaskModel {
  //   // ambil body yang dikirim dari FE
  //   return this.tasksService.createTask(createTaskDTO);
  // }

  // @Delete('/:id')
  // destroyTaskByID(@Param('id') id: string): TaskModel {
  //   const found = this.tasksService.destroyTask(id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with "${id}" not found`);
  //   }

  //   return found;
  // }

  // @Patch('/:id')
  // updateByID(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ): TaskModel {
  //   const { status } = updateTaskStatusDto;
  //   return this.tasksService.updateTask(id, status);
  // }
}
