"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const project_service_1 = require("../services/project.service");
const projectService = new project_service_1.ProjectService();
class ProjectController {
    async create(req, res) {
        try {
            const { nombre, descripcion } = req.body;
            const usuarioId = req.user.userId;
            const project = await projectService.create(nombre, descripcion, usuarioId);
            res.status(201).json(project);
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
            const projects = await projectService.findAll(usuarioId);
            res.status(200).json(projects);
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
            const project = await projectService.findOne(id, usuarioId);
            if (!project) {
                res.status(404).json({
                    message: "Proyecto no encontrado"
                });
                return;
            }
            res.status(200).json(project);
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
            const { nombre, descripcion } = req.body;
            const usuarioId = req.user.userId;
            const project = await projectService.update(id, nombre, descripcion, usuarioId);
            res.status(200).json(project);
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
            await projectService.delete(id, usuarioId);
            res.status(200).json({
                message: "Proyecto eliminado"
            });
        }
        catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }
}
exports.ProjectController = ProjectController;
