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
exports.CreateTaskHandler = void 0;
// src/tasks/commands/create-task.handler.ts
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const create_task_command_1 = require("./create-task.command");
const task_entity_1 = require("../task.entity");
const task_created_event_1 = require("../events/task-created-event");
const event_emitter_1 = require("../event-emitter");
let CreateTaskHandler = class CreateTaskHandler {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(command) {
        const { title, description } = command;
        const task = new task_entity_1.Task(title, description);
        await this.taskRepository.save(task);
        console.log('About to emit TaskCreated event');
        event_emitter_1.eventEmitter.emit('TaskCreated', new task_created_event_1.TaskCreatedEvent(task.title, task.description));
        console.log('Emitted TaskCreated event');
        return {
            message: 'Task Created',
            task: { task }
        };
    }
};
exports.CreateTaskHandler = CreateTaskHandler;
exports.CreateTaskHandler = CreateTaskHandler = __decorate([
    (0, cqrs_1.CommandHandler)(create_task_command_1.CreateTaskCommand),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CreateTaskHandler);
//# sourceMappingURL=create-task.handler.js.map