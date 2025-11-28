import "./Home.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">

      {/* VIDEO DE FONDO */}
      <video
        className="home-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/perfectly.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY SUAVE */}
      <div className="home-overlay"></div>

      {/* CONTENIDO */}
      <div className="home-content">

        {/* BOTONES SUPERIORES */}
        <div className="home-buttons">
          <Link
            to="/login"
            className="btn-light"
          >
            INICIAR SESIÓN
          </Link>

          <Link
            to="/signup"
            className="btn-light"
          >
            CREAR CUENTA
          </Link>
        </div>

        {/* LOGO CENTRAL */}
        <div className="home-logo-block">
          <img src={logo} alt="fitshuffle logo" className="home-logo" />
          <p className="home-subtitle">GENERA TU OUTFIT YA</p>
        </div>

      </div>
    </div>
  );
}
