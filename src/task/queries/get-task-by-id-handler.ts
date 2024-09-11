import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetTasksbyIdQuery } from "./get-task-by-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "../../task.entity";

@QueryHandler(GetTasksbyIdQuery)
export class GetTasksbyIdHandler implements IQueryHandler<GetTasksbyIdQuery>{
    constructor(@InjectRepository(Task)
    private readonly taskRepository: Repository<Task>){}

    async execute(query: GetTasksbyIdQuery): Promise<Task> {
        const {id}= query;
        const task = await this.taskRepository.findOneBy({id});
        if(!task){
            throw new Error('Task with ID${id} not found');
        }
        return task;
    }
}