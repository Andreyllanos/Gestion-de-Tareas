import { useEffect, useState } from "react";
import { profile } from "../services/auth.service";
import type { IUser } from "../interfaces/auth.interface";

function ProfilePage() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await profile();
      setUser(data.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Perfil</h1>
      <p className="eyebrow">Información de tu cuenta</p>

      {user ? (
        <div className="card profile-card">
          <p>
            <strong>Nombre:</strong> {user.nombre}
          </p>
          <p>
            <strong>Correo:</strong> {user.correo}
          </p>
          <p>
            <strong>Rol:</strong> {user.rol || "usuario"}
          </p>
          <p>
            <strong>Fecha de creación:</strong>{" "}
            {user.created_at
              ? new Date(user.created_at).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Sin información"}
          </p>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
}

export default ProfilePage;