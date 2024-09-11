import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from './commands/create-task.command';
import { GetTasksQuery } from './queries/get-tasks.query';

@Injectable()
export class TasksService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createTask(title: string, description: string) {
    return this.commandBus.execute(new CreateTaskCommand(title, description));
  }

  async getTasks() {
    return this.queryBus.execute(new GetTasksQuery());
  }
}
