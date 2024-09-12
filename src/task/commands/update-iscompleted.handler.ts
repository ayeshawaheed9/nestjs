import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateIsCompletedCommand } from "./update-iscompleted.command";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "../task.entity";

@CommandHandler(UpdateIsCompletedCommand)
export class UpdateIsCompletedHandler implements ICommandHandler<UpdateIsCompletedCommand> {
    constructor(
        @InjectRepository(Task)
        public taskRepository: Repository<Task>,
    ) {}

    async execute(command: UpdateIsCompletedCommand) {
        const { taskId, isCompleted } = command;
        let task = await this.taskRepository.findOne({ where: { id: taskId } });
        if (!task) {
            throw new Error(`Task with ID ${taskId} not found`);
        }
        task.isCompleted = isCompleted;
        await this.taskRepository.save(task);
        return {
            message: 'Task status updated successfully',
            task
        };
    }
}
