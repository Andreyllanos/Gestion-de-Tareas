import api from "./api";

export const getProjects = async () => {
  const response =
    await api.get("/projects");

  return response.data;
};

export const createProject = async (
  nombre: string,
  descripcion: string
) => {

  const response =
    await api.post(
      "/projects",
      {
        nombre,
        descripcion,
      }
    );

  return response.data;
};

export const deleteProject = async (
  id: string
) => {

  const response =
    await api.delete(
      `/projects/${id}`
    );

  return response.data;
};

export const updateProject = async (
  id: string,
  nombre: string,
  descripcion: string
) => {

  const response =
    await api.put(
      `/projects/${id}`,
      {
        nombre,
        descripcion
      }
    );

  return response.data;
};