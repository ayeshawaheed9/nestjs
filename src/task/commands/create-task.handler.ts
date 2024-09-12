// src/tasks/commands/create-task.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskCommand } from './create-task.command';
import { Task } from '../task.entity';
import { TaskCreatedEvent } from '../events/task-created-event';
import {eventEmitter} from '../event-emitter'; 
import { taskCreatedListener } from '../listeners/task-created.listener';

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
    console.log('About to emit TaskCreated event'); 
    eventEmitter.emit('TaskCreated', new TaskCreatedEvent(task.title, task.description));
    console.log('Emitted TaskCreated event'); 
    return {
      message: 'Task Created',
      task: {task}
    }
  }
}
