"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const task_repository_1 = require("../repositories/task.repository");
class TaskService {
    constructor() {
        this.repository = new task_repository_1.TaskRepository();
    }
    async create(titulo, descripcion, estado, prioridad, fechaLimite, proyectoId, usuarioId) {
        return this.repository.create(titulo, descripcion, estado, prioridad, fechaLimite, proyectoId, usuarioId);
    }
    async findAll(usuarioId) {
        return this.repository.findAll(usuarioId);
    }
    async findOne(id, usuarioId) {
        return this.repository.findById(id, usuarioId);
    }
    async update(id, titulo, descripcion, estado, prioridad, fechaLimite, usuarioId) {
        return this.repository.update(id, titulo, descripcion, estado, prioridad, fechaLimite, usuarioId);
    }
    async delete(id, usuarioId) {
        return this.repository.delete(id, usuarioId);
    }
}
exports.TaskService = TaskService;
