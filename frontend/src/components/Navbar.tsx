import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/projects", label: "Proyectos" },
    { to: "/tasks", label: "Tareas" },
    { to: "/profile", label: "Perfil" },
  ];

  return (
    <header className="navbar">
      <div className="brand-block">
        <div className="brand-mark">CBA</div>
        <div>
          <p className="brand-title">Gestión de tareas</p>
          <span className="brand-subtitle">Panel de control</span>
        </div>
      </div>

      <nav className="nav-links">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={location.pathname === link.to ? "active" : ""}
          >
            {link.label}
          </Link>
        ))}
        <button className="ghost-btn" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}

export default Navbar;