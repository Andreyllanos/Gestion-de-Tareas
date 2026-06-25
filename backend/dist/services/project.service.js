"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const project_repository_1 = require("../repositories/project.repository");
class ProjectService {
    constructor() {
        this.repository = new project_repository_1.ProjectRepository();
    }
    async create(nombre, descripcion, usuarioId) {
        return this.repository.create(nombre, descripcion, usuarioId);
    }
    async findAll(usuarioId) {
        return this.repository.findAllByUser(usuarioId);
    }
    async findOne(id, usuarioId) {
        return this.repository.findById(id, usuarioId);
    }
    async update(id, nombre, descripcion, usuarioId) {
        return this.repository.update(id, nombre, descripcion, usuarioId);
    }
    async delete(id, usuarioId) {
        return this.repository.delete(id, usuarioId);
    }
}
exports.ProjectService = ProjectService;
