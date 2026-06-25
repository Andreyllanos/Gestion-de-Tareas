import { pool } from "../config/db";
import { IUser } from "../models/user.interface";

export class UserRepository {
  async findByEmail(correo: string) {
    const result = await pool.query(
      `
      SELECT *
      FROM cbausuarios
      WHERE correo = $1
      `,
      [correo]
    );

    return result.rows[0];
  }

  async findById(id: number) {
    const result = await pool.query(
      `
      SELECT *
      FROM cbausuarios
      WHERE id = $1
      `,
      [id]
    );

    return result.rows[0];
  }

  async create(user: IUser) {
    const result = await pool.query(
      `
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
      `,
      [
        user.nombre,
        user.correo,
        user.password
      ]
    );

    return result.rows[0];
  }
}