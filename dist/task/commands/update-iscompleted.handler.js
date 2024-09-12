"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIsCompletedHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const update_iscompleted_command_1 = require("./update-iscompleted.command");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const task_entity_1 = require("../task.entity");
let UpdateIsCompletedHandler = class UpdateIsCompletedHandler {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(command) {
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
};
exports.UpdateIsCompletedHandler = UpdateIsCompletedHandler;
exports.UpdateIsCompletedHandler = UpdateIsCompletedHandler = __decorate([
    (0, cqrs_1.CommandHandler)(update_iscompleted_command_1.UpdateIsCompletedCommand),
    __param(0, (0, typeorm_2.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UpdateIsCompletedHandler);
//# sourceMappingURL=update-iscompleted.handler.js.map