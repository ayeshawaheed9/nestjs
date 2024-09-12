import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetTasksQuery } from './get-tasks.query';
import { Task } from '../task.entity';
import { getAlltasksDto } from '../dto/get-tasks.dto';

@QueryHandler(GetTasksQuery)
export class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {
    // console.log('GetTasksHandler initialized');
  }

  async execute(query: GetTasksQuery){
    const tasks = await this.taskRepository.find();
    
    // Map Task entity to TaskResponseDto
    return tasks.map(task => {
      const response = new getAlltasksDto();
      response.title = task.title;
      response.description = task.description;
      response.isCompleted = task.isCompleted;
      return response;
    }); 
  }
}
