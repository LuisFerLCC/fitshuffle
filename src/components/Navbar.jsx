import logo from "../assets/logo.png";
import logoBlanco from "../assets/logo-blanco.png";

export default function Navbar({ dark = false }) {
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
          <a href="/inicio" className="active">INICIO</a>
          <a href="/closet">CLOSET</a>
          <a href="/generator">GENERADOR</a>
          <a href="/cuenta">CUENTA</a>
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
