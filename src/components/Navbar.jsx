import logo from "../assets/logo.png";
import logoBlanco from "../assets/logo-blanco.png";
import { Link } from "react-router-dom";

export default function Navbar({ dark = false, inicioActive = false, closetActive = false, generatorActive = false, cuentaActive = false,  }) {
  const logoSrc = dark ? logoBlanco : logo;

  return (

    <div className={`navbar-exact ${dark ? 'navbar-dark' : ''}`}>
      <div className="navbar-inner">

        {/* LOGO */}
        <div className="navbar-logo">
          <img src={logoSrc} alt="fitshuffle" />
        </div>

        {/* LINKS */}
        <div className="navbar-links">
          <Link to="/inicio" className={inicioActive ? "active" : ""}>INICIO</Link>
          <Link to="/closet" className={closetActive ? "active" : ""}>CLOSET</Link>
          <Link to="/generator" className={generatorActive ? "active" : ""}>GENERADOR</Link>
          <Link to="/cuenta" className={cuentaActive ? "active" : ""}>CUENTA</Link>
        </div>

        {/* ICONO ⋮ */}
        <div className="navbar-dots">
          <span>●</span>
          <span>●</span>
          <span>●</span>
        </div>

      </div>
    </div>
  );
}
