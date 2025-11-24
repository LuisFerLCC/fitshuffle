import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <div className="navbar-exact">
      <div className="navbar-inner">

        {/* LOGO */}
        <div className="navbar-logo">
          <img src={logo} alt="fitshuffle" />
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
