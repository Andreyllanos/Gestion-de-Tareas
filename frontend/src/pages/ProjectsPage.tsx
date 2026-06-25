import { useEffect, useState } from "react";

import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
} from "../services/project.service";

import type { IProject } from "../interfaces/Project.interface";

function ProjectsPage() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNombre, setEditNombre] = useState("");
  const [editDescripcion, setEditDescripcion] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = async () => {
    if (!nombre.trim() || !descripcion.trim()) {
      setMessage("Ingresa nombre y descripción para crear un proyecto.");
      return;
    }

    try {
      await createProject(nombre, descripcion);
      setNombre("");
      setDescripcion("");
      setMessage("Proyecto creado correctamente.");
      await loadProjects();
    } catch (error) {
      console.error(error);
      setMessage("No se pudo crear el proyecto.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      await loadProjects();
      setMessage("Proyecto eliminado.");
    } catch (error) {
      console.error(error);
      setMessage("No se pudo eliminar el proyecto.");
    }
  };

  const startEdit = (id: string, nombre: string, descripcion: string) => {
    setEditingId(id);
    setEditNombre(nombre);
    setEditDescripcion(descripcion);
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    if (!editNombre.trim() || !editDescripcion.trim()) {
      setMessage("Completa los campos antes de guardar.");
      return;
    }

    try {
      await updateProject(editingId, editNombre, editDescripcion);
      setEditingId(null);
      setEditNombre("");
      setEditDescripcion("");
      await loadProjects();
      setMessage("Proyecto actualizado.");
    } catch (error) {
      console.error(error);
      setMessage("No se pudo actualizar el proyecto.");
    }
  };

  return (
    <div>
      <h1>Proyectos</h1>
      <p className="eyebrow">Organiza tu trabajo por iniciativa o cliente.</p>

      <div className="card">
        <h3>Nuevo proyecto</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        {message ? <p className="form-message">{message}</p> : null}

        <button onClick={handleCreate}>Crear Proyecto</button>
      </div>

      <div className="card">
        <h3>Buscar proyectos</h3>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredProjects.length === 0 ? (
          <p>No hay proyectos que coincidan con la búsqueda.</p>
        ) : (
          filteredProjects.map((project) => (
            <div key={project.id} className="list-item">
              {editingId === project.id ? (
                <>
                  <input
                    value={editNombre}
                    onChange={(e) => setEditNombre(e.target.value)}
                  />
                  <textarea
                    value={editDescripcion}
                    onChange={(e) => setEditDescripcion(e.target.value)}
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
                  <h3>{project.nombre}</h3>
                  <p>{project.descripcion}</p>
                  <div className="actions-row">
                    <button className="secondary" onClick={() => startEdit(project.id, project.nombre, project.descripcion)}>
                      Editar
                    </button>
                    <button className="danger-btn" onClick={() => handleDelete(project.id)}>
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

export default ProjectsPage;