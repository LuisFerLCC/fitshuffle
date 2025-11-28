import Navbar from "../components/Navbar";
import "../styles/perfil.css";

import { FiLogOut, FiHeart, FiSettings, FiBarChart2 } from "react-icons/fi";

export default function Profile() {

  const handleLogout = () => {
    window.location.href = "/";  
  };

  return (
    <div className="profile-page black-bg">
      <Navbar dark={true} />

      <div className="profile-grid-figma">

        {/* CARD DEL PERFIL */}
        <div className="card-profile">
          <div className="circle-deco"></div>

          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut size={26} />
          </button>

          <h1 className="profile-username">USERNAME</h1>
        </div>

        {/* OUTFIT CARD */}
        <div className="card-outfit">
          <FiHeart size={28} className="heart" />

          <p className="outfit-title">THE NORMAL</p>
          <a href="#" className="outfit-link">See All →</a>
        </div>

        <a href="/stats" className="card-small card-link">
          <div className="icon-row">
            <FiBarChart2 size={24} className="card-icon" />
            <h2 className="card-small-title">STATS</h2>
          </div>
        </a>

        {/* SETTINGS */}
        <div className="card-small">
          <div className="icon-row">
            <FiSettings size={24} className="card-icon" />
            <h2 className="card-small-title">SETTINGS</h2>
          </div>
        </div>

      </div>
    </div>
  );
}
