"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const db_1 = require("../config/db");
class UserRepository {
    async findByEmail(correo) {
        const result = await db_1.pool.query(`
      SELECT *
      FROM cbausuarios
      WHERE correo = $1
      `, [correo]);
        return result.rows[0];
    }
    async findById(id) {
        const result = await db_1.pool.query(`
      SELECT *
      FROM cbausuarios
      WHERE id = $1
      `, [id]);
        return result.rows[0];
    }
    async create(user) {
        const result = await db_1.pool.query(`
      INSERT INTO cbausuarios
      (
        nombre,
        correo,
        password
      )
      VALUES
      (
        $1,
        $2,
        $3
      )
      RETURNING *
      `, [
            user.nombre,
            user.correo,
            user.password
        ]);
        return result.rows[0];
    }
}
exports.UserRepository = UserRepository;
