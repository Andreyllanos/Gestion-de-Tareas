import { TaskRepository } from "../repositories/task.repository";

export class TaskService {

  private repository =
    new TaskRepository();

  async create(
    titulo: string,
    descripcion: string,
    estado: string,
    prioridad: string,
    fechaLimite: Date,
    proyectoId: number,
    usuarioId: number
  ) {

    return this.repository.create(
      titulo,
      descripcion,
      estado,
      prioridad,
      fechaLimite,
      proyectoId,
      usuarioId
    );
  }

  async findAll(usuarioId: number) {

    return this.repository.findAll(
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
  titulo: string,
  descripcion: string,
  estado: string,
  prioridad: string,
  fechaLimite: Date,
  usuarioId: number
) {

  return this.repository.update(
    id,
    titulo,
    descripcion,
    estado,
    prioridad,
    fechaLimite,
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