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
exports.UpdateTitleHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const update_title_command_1 = require("./update-title.command");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("../task.entity");
const typeorm_2 = require("typeorm");
let UpdateTitleHandler = class UpdateTitleHandler {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(command) {
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
};
exports.UpdateTitleHandler = UpdateTitleHandler;
exports.UpdateTitleHandler = UpdateTitleHandler = __decorate([
    (0, cqrs_1.CommandHandler)(update_title_command_1.UpdateTitleCommand),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UpdateTitleHandler);
//# sourceMappingURL=update-title.handler.js.map