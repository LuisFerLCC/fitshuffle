import homePhoto from "../assets/home-photo.jpg";
import logo from "../assets/logo.png";

export default function Home2() {
  return (
    <div className="page">

      {/* HEADER EXACTO */}
      <div className="navbar-exact">
        <div className="navbar-inner">

          {/* Logo */}
          <div className="navbar-logo">
            <img src={logo} alt="fitshuffle logo" />
          </div>

          {/* Links */}
          <div className="navbar-links">
            <a href="/inicio" className="active">INICIO</a>
            <a href="/closet">CLOSET</a>
            <a href="/generator">GENERADOR</a>
            <a href="/cuenta">CUENTA</a>
          </div>

          {/* Tres puntos */}
          <div className="navbar-dots">
            <span>●</span>
            <span>●</span>
            <span>●</span>
          </div>

        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="home2-grid">

        {/* LEFT BOX */}
        <div className="home2-left">
          <h1 className="home2-title">
            UPLOAD.<br />
            SHUFFLE.<br />
            SLAY.
          </h1>

          {/* Flechas */}
          <div className="home2-arrows">
            <svg width="110" height="110" viewBox="0 0 100 100">
              <path d="M20 40 L80 40 L65 25" stroke="black" strokeWidth="4" fill="none" />
              <path d="M80 60 L20 60 L35 75" stroke="black" strokeWidth="4" fill="none" />
            </svg>
          </div>

          <p className="home2-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua.
          </p>

          {/* TARJETAS DE OUTFIT */}
          <div className="home2-outfits-row">

            <div className="outfit-card outfit-card-1">
              <span className="outfit-label">#OUTFIT</span>
            </div>

            <div className="outfit-card outfit-card-2">
              <span className="outfit-label">#OUTFIT</span>
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="home2-right">
          <img src={homePhoto} alt="fashion" className="home2-photo" />
        </div>

      </div>
    </div>
  );
}
