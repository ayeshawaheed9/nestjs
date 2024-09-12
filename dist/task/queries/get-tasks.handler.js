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
exports.GetTasksHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const get_tasks_query_1 = require("./get-tasks.query");
const task_entity_1 = require("../task.entity");
const get_tasks_dto_1 = require("../dto/get-tasks.dto");
let GetTasksHandler = class GetTasksHandler {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
        // console.log('GetTasksHandler initialized');
    }
    async execute(query) {
        const tasks = await this.taskRepository.find();
        // Map Task entity to TaskResponseDto
        return tasks.map(task => {
            const response = new get_tasks_dto_1.getAlltasksDto();
            response.title = task.title;
            response.description = task.description;
            response.isCompleted = task.isCompleted;
            return response;
        });
    }
};
exports.GetTasksHandler = GetTasksHandler;
exports.GetTasksHandler = GetTasksHandler = __decorate([
    (0, cqrs_1.QueryHandler)(get_tasks_query_1.GetTasksQuery),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GetTasksHandler);
//# sourceMappingURL=get-tasks.handler.js.map