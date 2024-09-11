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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const task_controller_1 = require("./task.controller");
const task_service_1 = require("./task.service");
const task_entity_1 = require("../task.entity");
const create_task_handler_1 = require("./commands/create-task.handler");
const get_tasks_handler_1 = require("./queries/get-tasks.handler");
const get_task_by_id_handler_1 = require("./queries/get-task-by-id-handler");
const update_iscompleted_handler_1 = require("./commands/update-iscompleted.handler");
const update_title_handler_1 = require("./commands/update-title.handler");
let TasksModule = class TasksModule {
    constructor() {
        console.log('TasksModule initialized');
    }
};
exports.TasksModule = TasksModule;
exports.TasksModule = TasksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([task_entity_1.Task]),
            cqrs_1.CqrsModule,
        ],
        controllers: [task_controller_1.TaskController],
        providers: [
            cqrs_1.QueryBus, cqrs_1.CommandBus,
            task_service_1.TasksService,
            create_task_handler_1.CreateTaskHandler,
            get_tasks_handler_1.GetTasksHandler,
            get_task_by_id_handler_1.GetTasksbyIdHandler,
            update_iscompleted_handler_1.UpdateIsCompletedHandler,
            update_title_handler_1.UpdateTitleHandler
        ]
    }),
    __metadata("design:paramtypes", [])
], TasksModule);
//# sourceMappingURL=task.module.js.map