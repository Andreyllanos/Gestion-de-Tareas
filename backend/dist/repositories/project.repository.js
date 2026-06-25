"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepository = void 0;
const db_1 = require("../config/db");
class ProjectRepository {
    async create(nombre, descripcion, usuarioId) {
        const result = await db_1.pool.query(`
            INSERT INTO cbaproyectos
            (
                nombre,
                descripcion,
                usuario_id
            )
            VALUES
            (
                $1,
                $2,
                $3
            )
            RETURNING *
            `, [
            nombre,
            descripcion,
            usuarioId
        ]);
        return result.rows[0];
    }
    async findAllByUser(usuarioId) {
        const result = await db_1.pool.query(`
            SELECT *
            FROM cbaproyectos
            WHERE usuario_id = $1
            ORDER BY created_at DESC
            `, [usuarioId]);
        return result.rows;
    }
    async findById(id, usuarioId) {
        const result = await db_1.pool.query(`
            SELECT *
            FROM cbaproyectos
            WHERE id = $1
            AND usuario_id = $2
            `, [
            id,
            usuarioId
        ]);
        return result.rows[0];
    }
    async update(id, nombre, descripcion, usuarioId) {
        const result = await db_1.pool.query(`
            UPDATE cbaproyectos
            SET
                nombre = $1,
                descripcion = $2
            WHERE id = $3
            AND usuario_id = $4
            RETURNING *
            `, [
            nombre,
            descripcion,
            id,
            usuarioId
        ]);
        return result.rows[0];
    }
    async delete(id, usuarioId) {
        const result = await db_1.pool.query(`
            DELETE FROM cbaproyectos
            WHERE id = $1
            AND usuario_id = $2
            RETURNING *
            `, [
            id,
            usuarioId
        ]);
        return result.rows[0];
    }
}
exports.ProjectRepository = ProjectRepository;
