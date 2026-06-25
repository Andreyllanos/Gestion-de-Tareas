export interface IUser {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  created_at?: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
}