"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = require("../services/task.service");
const taskService = new task_service_1.TaskService();
class TaskController {
    async create(req, res) {
        try {
            const { titulo, descripcion, estado, prioridad, fecha_limite, proyecto_id } = req.body;
            const usuarioId = req.user.userId;
            const task = await taskService.create(titulo, descripcion, estado, prioridad, fecha_limite, proyecto_id, usuarioId);
            res.status(201).json(task);
        }
        catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }
    async findAll(req, res) {
        try {
            const usuarioId = req.user.userId;
            const tasks = await taskService.findAll(usuarioId);
            res.status(200).json(tasks);
        }
        catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }
    async findOne(req, res) {
        try {
            const id = Number(req.params.id);
            const usuarioId = req.user.userId;
            const task = await taskService.findOne(id, usuarioId);
            if (!task) {
                res.status(404).json({
                    message: "Tarea no encontrada"
                });
                return;
            }
            res.status(200).json(task);
        }
        catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }
    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const { titulo, descripcion, estado, prioridad, fecha_limite } = req.body;
            const usuarioId = req.user.userId;
            const task = await taskService.update(id, titulo, descripcion, estado, prioridad, fecha_limite, usuarioId);
            res.status(200).json(task);
        }
        catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }
    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            const usuarioId = req.user.userId;
            await taskService.delete(id, usuarioId);
            res.status(200).json({
                message: "Tarea eliminada"
            });
        }
        catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }
}
exports.TaskController = TaskController;
