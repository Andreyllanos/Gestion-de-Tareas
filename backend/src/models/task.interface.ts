export interface ITask {
  id?: number;

  titulo: string;

  descripcion?: string;

  estado?: "pendiente" | "en_progreso" | "completada";

  prioridad?: "baja" | "media" | "alta";

  fecha_limite?: Date;

  proyecto_id: number;

  usuario_id: number;

  created_at?: Date;
}