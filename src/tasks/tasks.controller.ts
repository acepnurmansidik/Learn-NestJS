import { CreateTaskDto } from './dto/create-task.dto';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
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
  // getAllTasks(@Param('id') id: string): void {
  //   console.log('object', this.tasksService.getTaskById(id));
  // }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
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
