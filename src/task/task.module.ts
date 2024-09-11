import { Module } from '@nestjs/common';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TasksService } from './task.service';
import { Task } from '../task.entity';
import { CreateTaskHandler } from './commands/create-task.handler';
import { GetTasksHandler } from './queries/get-tasks.handler';
import { GetTasksbyIdHandler } from './queries/get-task-by-id-handler';
import { UpdateIsCompletedHandler } from './commands/update-iscompleted.handler';
import { UpdateTitleHandler } from './commands/update-title.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), 
    CqrsModule,
  ],
  controllers: [TaskController],
  providers: [
    QueryBus,CommandBus,
    TasksService,
    CreateTaskHandler,
    GetTasksHandler,
    GetTasksbyIdHandler,
    UpdateIsCompletedHandler,
    UpdateTitleHandler
  ]
})
export class TasksModule {
  constructor() {
    console.log('TasksModule initialized');
}
}