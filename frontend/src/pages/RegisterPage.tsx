import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth.service";

function RegisterPage() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !correo.trim() || !password.trim()) {
      setMessage("Todos los campos son obligatorios.");
      return;
    }

    try {
      await register(nombre, correo, password);
      setMessage("Usuario creado correctamente. Ahora puedes iniciar sesión.");
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage("No se pudo crear la cuenta. Intenta nuevamente.");
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Crear cuenta</h1>
        <p className="eyebrow">Únete a CBA Gestión de Tareas</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {message ? <p className="form-message">{message}</p> : null}

          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;