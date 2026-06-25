export interface IUser {
  id?: number;
  nombre: string;
  correo: string;
  password: string;
  rol?: string;
  created_at?: Date;
}