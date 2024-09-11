import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetTasksQuery } from './get-tasks.query';
import { Task } from '../../task.entity';

@QueryHandler(GetTasksQuery)
export class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {
    console.log('GetTasksHandler initialized');
  }

  async execute(query: GetTasksQuery): Promise<Task[]> {
    return await this.taskRepository.find();
  }
}
