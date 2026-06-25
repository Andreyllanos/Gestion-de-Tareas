import { pool } from "../config/db";

export class DashboardRepository {

    async getStats(
        usuarioId: number
    ) {

        console.log(
            "Dashboard usuario:",
            usuarioId
        );

        const result = await pool.query(
            `
            SELECT

            (
                SELECT COUNT(*)
                FROM cbaproyectos
                WHERE usuario_id = $1
            ) AS total_projects,

            (
                SELECT COUNT(*)
                FROM cbatareas
                WHERE usuario_id = $1
            ) AS total_tasks,

            (
                SELECT COUNT(*)
                FROM cbatareas
                WHERE usuario_id = $1
                AND estado = 'pendiente'
            ) AS pendientes,

            (
                SELECT COUNT(*)
                FROM cbatareas
                WHERE usuario_id = $1
                AND estado = 'en_progreso'
            ) AS en_progreso,

            (
                SELECT COUNT(*)
                FROM cbatareas
                WHERE usuario_id = $1
                AND estado = 'completada'
            ) AS completadas
            `,
            [usuarioId]
        );

        console.log(
            "Dashboard resultado:",
            result.rows[0]
        );

        return result.rows[0];
    }
}