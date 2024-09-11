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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const create_task_command_1 = require("./commands/create-task.command");
const task_entity_1 = require("../task.entity");
const get_tasks_query_1 = require("./queries/get-tasks.query");
const get_task_by_id_query_1 = require("./queries/get-task-by-id.query");
const update_iscompleted_command_1 = require("./commands/update-iscompleted.command");
const update_title_command_1 = require("./commands/update-title.command");
let TaskController = class TaskController {
    constructor(commandBus, queryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    async createTask(task) {
        const command = new create_task_command_1.CreateTaskCommand(task.title, task.description);
        return await this.commandBus.execute(command);
    }
    async updatetaskcompletion(id, isCompleted) {
        const command = new update_iscompleted_command_1.UpdateIsCompletedCommand(id, isCompleted);
        return await this.commandBus.execute(command);
    }
    async updatetaskstatus(id, isCompleted) {
        const command = new update_iscompleted_command_1.UpdateIsCompletedCommand(id, isCompleted);
        return await this.commandBus.execute(command);
    }
    async updatetitle(id, title) {
        const command = new update_title_command_1.UpdateTitleCommand(id, title);
        return await this.commandBus.execute(command);
    }
    async testRoute() {
        return 'Test Route Working';
    }
    async getallTasks() {
        const query = new get_tasks_query_1.GetTasksQuery();
        return await this.queryBus.execute(query);
    }
    async getTaskbyId(id) {
        const query = new get_task_by_id_query_1.GetTasksbyIdQuery(id);
        return await this.queryBus.execute(query);
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [task_entity_1.Task]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "createTask", null);
__decorate([
    (0, common_1.Post)('/status/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('isCompleted')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updatetaskcompletion", null);
__decorate([
    (0, common_1.Put)('/changetaskstatus/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('isCompleted')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updatetaskstatus", null);
__decorate([
    (0, common_1.Put)('/title/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updatetitle", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "testRoute", null);
__decorate([
    (0, common_1.Get)('/getalltasks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getallTasks", null);
__decorate([
    (0, common_1.Get)('/gettask/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getTaskbyId", null);
exports.TaskController = TaskController = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus])
], TaskController);
//# sourceMappingURL=task.controller.js.map