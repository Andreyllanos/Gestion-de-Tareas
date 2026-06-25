import { useEffect, useState } from "react";

import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../services/task.service";

import { getProjects } from "../services/project.service";

import type { ITask } from "../interfaces/Task.interface";
import type { IProject } from "../interfaces/Project.interface";

function TasksPage() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("pendiente");
  const [prioridad, setPrioridad] = useState("media");
  const [fechaLimite, setFechaLimite] = useState("");
  const [proyectoId, setProyectoId] = useState("");
  const [filterEstado, setFilterEstado] = useState("all");
  const [filterPrioridad, setFilterPrioridad] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitulo, setEditTitulo] = useState("");
  const [editDescripcion, setEditDescripcion] = useState("");
  const [editEstado, setEditEstado] = useState("pendiente");
  const [editPrioridad, setEditPrioridad] = useState("media");
  const [editFechaLimite, setEditFechaLimite] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadTasks();
    loadProjects();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
      if (data.length > 0) {
        setProyectoId(data[0].id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const estadoMatch = filterEstado === "all" || task.estado === filterEstado;
    const prioridadMatch = filterPrioridad === "all" || task.prioridad === filterPrioridad;
    return estadoMatch && prioridadMatch;
  });

  const handleCreate = async () => {
    if (!titulo.trim() || !descripcion.trim() || !proyectoId) {
      setMessage("Completa el título, la descripción y selecciona un proyecto.");
      return;
    }

    try {
      await createTask(
        titulo,
        descripcion,
        estado,
        prioridad,
        fechaLimite || "2026-12-31",
        Number(proyectoId)
      );

      setTitulo("");
      setDescripcion("");
      setEstado("pendiente");
      setPrioridad("media");
      setFechaLimite("");
      setMessage("Tarea creada correctamente.");
      await loadTasks();
    } catch (error) {
      console.error(error);
      setMessage("No se pudo crear la tarea.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      await loadTasks();
      setMessage("Tarea eliminada.");
    } catch (error) {
      console.error(error);
      setMessage("No se pudo eliminar la tarea.");
    }
  };

  const startEdit = (task: ITask) => {
    setEditingId(task.id);
    setEditTitulo(task.titulo);
    setEditDescripcion(task.descripcion);
    setEditEstado(task.estado);
    setEditPrioridad(task.prioridad);
    setEditFechaLimite(task.fecha_limite);
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    if (!editTitulo.trim() || !editDescripcion.trim()) {
      setMessage("Completa título y descripción antes de guardar.");
      return;
    }

    try {
      await updateTask(
        editingId,
        editTitulo,
        editDescripcion,
        editEstado,
        editPrioridad,
        editFechaLimite
      );

      setEditingId(null);
      await loadTasks();
      setMessage("Tarea actualizada.");
    } catch (error) {
      console.error(error);
      setMessage("No se pudo actualizar la tarea.");
    }
  };

  return (
    <div>
      <h1>Tareas</h1>
      <p className="eyebrow">Prioriza trabajo, estado y proyectos.</p>

      <div className="card">
        <h3>Nueva tarea</h3>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="pendiente">Pendiente</option>
          <option value="en_progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>

        <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>

        <input
          type="date"
          value={fechaLimite}
          onChange={(e) => setFechaLimite(e.target.value)}
        />

        <select value={proyectoId} onChange={(e) => setProyectoId(e.target.value)}>
          {projects.length === 0 ? (
            <option value="">No hay proyectos</option>
          ) : (
            projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.nombre}
              </option>
            ))
          )}
        </select>

        {message ? <p className="form-message">{message}</p> : null}

        <button onClick={handleCreate}>Crear tarea</button>
      </div>

      <div className="card">
        <h3>Filtrar tareas</h3>
        <div className="filter-row">
          <select value={filterEstado} onChange={(e) => setFilterEstado(e.target.value)}>
            <option value="all">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="en_progreso">En progreso</option>
            <option value="completada">Completada</option>
          </select>

          <select value={filterPrioridad} onChange={(e) => setFilterPrioridad(e.target.value)}>
            <option value="all">Todas las prioridades</option>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        {filteredTasks.length === 0 ? (
          <p>No hay tareas que coincidan con los filtros.</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="list-item">
              {editingId === task.id ? (
                <>
                  <input
                    value={editTitulo}
                    onChange={(e) => setEditTitulo(e.target.value)}
                  />
                  <textarea
                    value={editDescripcion}
                    onChange={(e) => setEditDescripcion(e.target.value)}
                  />
                  <select value={editEstado} onChange={(e) => setEditEstado(e.target.value)}>
                    <option value="pendiente">Pendiente</option>
                    <option value="en_progreso">En progreso</option>
                    <option value="completada">Completada</option>
                  </select>
                  <select value={editPrioridad} onChange={(e) => setEditPrioridad(e.target.value)}>
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                  </select>
                  <input
                    type="date"
                    value={editFechaLimite}
                    onChange={(e) => setEditFechaLimite(e.target.value)}
                  />
                  <div className="actions-row">
                    <button onClick={handleUpdate}>Guardar</button>
                    <button className="secondary" onClick={() => setEditingId(null)}>
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3>{task.titulo}</h3>
                  <p>{task.descripcion}</p>
                  <p>Estado: {task.estado}</p>
                  <p>Prioridad: {task.prioridad}</p>
                  <p>Fecha límite: {task.fecha_limite}</p>
                  <div className="actions-row">
                    <button className="secondary" onClick={() => startEdit(task)}>
                      Editar
                    </button>
                    <button className="danger-btn" onClick={() => handleDelete(task.id)}>
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TasksPage;