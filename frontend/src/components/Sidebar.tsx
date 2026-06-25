import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/projects", label: "Proyectos" },
    { to: "/tasks", label: "Tareas" },
    { to: "/profile", label: "Perfil" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h3>CBA</h3>
        <p>Operación ágil</p>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={location.pathname === link.to ? "sidebar-link active" : "sidebar-link"}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;