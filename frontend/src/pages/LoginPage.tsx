import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/auth.service";

function LoginPage() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!correo.trim() || !password.trim()) {
      setMessage("Completa correo y contraseña para continuar.");
      return;
    }

    try {
      const data = await login(correo, password);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setMessage("Credenciales inválidas. Intenta nuevamente.");
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Iniciar sesión</h1>
        <p className="eyebrow">Accede a tu espacio de trabajo</p>

        <form onSubmit={handleLogin}>
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

          <button type="submit">Iniciar sesión</button>
        </form>

        <p className="auth-link">
          ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;