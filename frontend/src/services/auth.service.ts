import api from "./api";

export const register = async (
  nombre: string,
  correo: string,
  password: string
) => {

  const response =
    await api.post(
      "/auth/register",
      {
        nombre,
        correo,
        password,
      }
    );

  return response.data;
};

export const login = async (
  correo: string,
  password: string
) => {

  const response =
    await api.post(
      "/auth/login",
      {
        correo,
        password,
      }
    );

  return response.data;
};

export const profile = async () => {

  const response =
    await api.get(
      "/auth/profile"
    );

  return response.data;
};