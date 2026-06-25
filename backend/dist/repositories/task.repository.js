"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const db_1 = require("../config/db");
class TaskRepository {
    async create(titulo, descripcion, estado, prioridad, fechaLimite, proyectoId, usuarioId) {
        const result = await db_1.pool.query(`
      INSERT INTO cbatareas
      (
        titulo,
        descripcion,
        estado,
        prioridad,
        fecha_limite,
        proyecto_id,
        usuario_id
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6,$7
      )
      RETURNING *
      `, [
            titulo,
            descripcion,
            estado,
            prioridad,
            fechaLimite,
            proyectoId,
            usuarioId
        ]);
        return result.rows[0];
    }
    async findAll(usuarioId) {
        const result = await db_1.pool.query(`
      SELECT *
      FROM cbatareas
      WHERE usuario_id = $1
      ORDER BY created_at DESC
      `, [usuarioId]);
        return result.rows;
    }
    async findById(id, usuarioId) {
        const result = await db_1.pool.query(`
      SELECT *
      FROM cbatareas
      WHERE id = $1
      AND usuario_id = $2
      `, [id, usuarioId]);
        return result.rows[0];
    }
    async update(id, titulo, descripcion, estado, prioridad, fechaLimite, usuarioId) {
        const result = await db_1.pool.query(`
      UPDATE cbatareas
SET
  titulo = $1,
  descripcion = $2,
  estado = $3,
  prioridad = $4,
  fecha_limite = $5
WHERE id = $6
AND usuario_id = $7
RETURNING *
      `, [
            titulo,
            descripcion,
            estado,
            prioridad,
            fechaLimite,
            id,
            usuarioId
        ]);
        return result.rows[0];
    }
    async delete(id, usuarioId) {
        const result = await db_1.pool.query(`
      DELETE FROM cbatareas
      WHERE id = $1
      AND usuario_id = $2
      RETURNING *
      `, [id, usuarioId]);
        return result.rows[0];
    }
}
exports.TaskRepository = TaskRepository;
