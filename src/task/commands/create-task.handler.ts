// src/tasks/commands/create-task.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskCommand } from './create-task.command';
import { Task } from '../../task.entity';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async execute(command: CreateTaskCommand){
    const { title, description } = command;
    const task = new Task(title,description);
    await this.taskRepository.save(task);
    return {
      message: 'Task Created',
      task: {task}
    }
  }
}
