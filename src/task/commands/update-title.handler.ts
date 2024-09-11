import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateTitleCommand } from "./update-title.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "../../task.entity";
import { Repository } from "typeorm";

@CommandHandler(UpdateTitleCommand)
export class UpdateTitleHandler implements ICommandHandler<UpdateTitleCommand> {
    constructor(
        @InjectRepository(Task)
        public taskRepository: Repository<Task>
    ) {}

    async execute(command: UpdateTitleCommand): Promise<any> {
        const { taskId, title } = command;
        const task = await this.taskRepository.findOne({ where: { id: taskId } });
        if (!task) {
            throw new Error(`Task with ID ${taskId} not found`);
        }
        task.title = title;
        await this.taskRepository.save(task);
        return {
            message: 'Task title updated successfully',
            task
        };
    }
}
