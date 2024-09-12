import { Controller, Get, Post,Put, Body, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from './commands/create-task.command';
import { Task } from './task.entity';
import { GetTasksQuery } from './queries/get-tasks.query';
import { GetTasksbyIdQuery } from './queries/get-task-by-id.query';
import { UpdateIsCompletedCommand } from './commands/update-iscompleted.command';
import { UpdateTitleCommand } from './commands/update-title.command';
import { CreateTaskDto } from './dto/create-task.dto';
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    const command = new CreateTaskCommand(createTaskDto.title, createTaskDto.description);
    return await this.commandBus.execute(command);
  }
  @Post('/status/:id')
  async updatetaskcompletion(@Param('id') id: number, @Body('isCompleted') isCompleted: boolean
  ){
    const command = new UpdateIsCompletedCommand(id,isCompleted)
    return await this.commandBus.execute(command);
  }
  @Put('/changetaskstatus/:id')
  async updatetaskstatus(@Param('id') id: number, @Body('isCompleted') isCompleted: boolean
  ){
    const command = new UpdateIsCompletedCommand(id,isCompleted)
    return await this.commandBus.execute(command);
  }
  @Put('/title/:id')
  async updatetitle(@Param('id')id: number,@Body('title')title:string)
  {
    const command = new UpdateTitleCommand(id,title);
    return await this.commandBus.execute(command);
  }
  
  @Get()
  async testRoute() {
    return 'Test Route Working';
  }  
  @Get('/getalltasks')
  async getallTasks(){
    const query = new GetTasksQuery();
    return await this.queryBus.execute(query);
  }

  @Get('/gettask/:id')
  async getTaskbyId( @Param('id') id: number) {
    const query = new GetTasksbyIdQuery(id);
    return await this.queryBus.execute(query);
  }
}
