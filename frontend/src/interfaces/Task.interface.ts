export interface ITask {
  id: string;
  titulo: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  fecha_limite: string;
  proyecto_id: string;
  usuario_id: string;
  created_at: string;
}