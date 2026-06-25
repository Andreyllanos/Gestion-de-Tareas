import api from "./api";

export const getTasks =
  async () => {

    const response =
      await api.get(
        "/tasks"
      );

    return response.data;
  };

export const createTask =
  async (
    titulo: string,
    descripcion: string,
    estado: string,
    prioridad: string,
    fecha_limite: string,
    proyecto_id: number
  ) => {

    const response =
      await api.post(
        "/tasks",
        {
          titulo,
          descripcion,
          estado,
          prioridad,
          fecha_limite,
          proyecto_id,
        }
      );

    return response.data;
  };

export const deleteTask =
  async (
    id: string
  ) => {

    const response =
      await api.delete(
        `/tasks/${id}`
      );

    return response.data;
  };

export const updateTask =
  async (
    id: string,
    titulo: string,
    descripcion: string,
    estado: string,
    prioridad: string,
    fecha_limite: string
  ) => {

    const response =
      await api.put(
        `/tasks/${id}`,
        {
          titulo,
          descripcion,
          estado,
          prioridad,
          fecha_limite,
        }
      );

    return response.data;
  };