import Navbar from "../components/Navbar";
import "../styles/stats.css";

import { FiBarChart2, FiPieChart, FiTrendingUp, FiUser } from "react-icons/fi";

export default function Stats() {
  return (
    <div className="stats-page light-bg">
      
      <Navbar dark={false} />

      <h1 className="stats-title">ESTADÍSTICAS</h1>

      <div className="stats-grid">

        <div className="stat-card">
          <FiBarChart2 size={32} />
          <h2>Outfits Generados</h2>
          <p>128</p>
        </div>

        <div className="stat-card">
          <FiPieChart size={32} />
          <h2>Prendas Usadas</h2>
          <p>320</p>
        </div>

        <div className="stat-card">
          <FiTrendingUp size={32} />
          <h2>Más Usado</h2>
          <p>Playeras / Jeans</p>
        </div>

        <div className="stat-card">
          <FiUser size={32} />
          <h2>Días Activo</h2>
          <p>22</p>
        </div>

      </div>
    </div>
  );
}
