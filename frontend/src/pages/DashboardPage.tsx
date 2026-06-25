import { useEffect, useState } from "react";

import { getDashboardStats } from "../services/dashboard.service";

import type { IDashboard } from "../interfaces/Dashboard.interface";

function DashboardPage() {
  const [stats, setStats] = useState<IDashboard | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) {
    return <h2>Cargando...</h2>;
  }

  const cards = [
    { title: "Total proyectos", value: stats.total_projects, tone: "primary" },
    { title: "Total tareas", value: stats.total_tasks, tone: "secondary" },
    { title: "Pendientes", value: stats.pendientes, tone: "warning" },
    { title: "En progreso", value: stats.en_progreso, tone: "info" },
    { title: "Completadas", value: stats.completadas, tone: "success" },
  ];

  return (
    <div>
      <h1>Dashboard</h1>
      <p className="eyebrow">Resumen ejecutivo de tu operación.</p>

      <div className="stats-grid">
        {cards.map((card) => (
          <div key={card.title} className={`stat-card ${card.tone}`}>
            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;