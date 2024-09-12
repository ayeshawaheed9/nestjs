import { Module } from '@nestjs/common';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TasksService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskHandler } from './commands/create-task.handler';
import { GetTasksHandler } from './queries/get-tasks.handler';
import { GetTasksbyIdHandler } from './queries/get-task-by-id-handler';
import { UpdateIsCompletedHandler } from './commands/update-iscompleted.handler';
import { UpdateTitleHandler } from './commands/update-title.handler';
import { taskCreatedListener } from './listeners/task-created.listener';
import { TaskCreatedEvent } from './events/task-created-event';

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
    UpdateTitleHandler, taskCreatedListener,TaskCreatedEvent
  ]
})
export class TasksModule {
  constructor() {
    console.log('TasksModule initialized');
}
}