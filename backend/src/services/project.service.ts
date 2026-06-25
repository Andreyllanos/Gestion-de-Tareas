import { ProjectRepository } from "../repositories/project.repository";

export class ProjectService {

    private repository =
        new ProjectRepository();

    async create(
        nombre: string,
        descripcion: string,
        usuarioId: number
    ) {
        return this.repository.create(
            nombre,
            descripcion,
            usuarioId
        );
    }

    async findAll(
        usuarioId: number
    ) {
        return this.repository.findAllByUser(
            usuarioId
        );
    }

    async findOne(
        id: number,
        usuarioId: number
    ) {
        return this.repository.findById(
            id,
            usuarioId
        );
    }

    async update(
        id: number,
        nombre: string,
        descripcion: string,
        usuarioId: number
    ) {
        return this.repository.update(
            id,
            nombre,
            descripcion,
            usuarioId
        );
    }

    async delete(
        id: number,
        usuarioId: number
    ) {
        return this.repository.delete(
            id,
            usuarioId
        );
    }
}