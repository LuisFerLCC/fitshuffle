import logo from "../assets/logo.png";

export default function Profile() {
  return (
    <div className="page profile-page">

      {/* HEADER EXACTO */}
      <div className="navbar-exact">
        <div className="navbar-inner">

          <div className="navbar-logo">
            <img src={logo} alt="fitshuffle logo" />
          </div>

          <div className="navbar-links">
            <a href="/inicio">INICIO</a>
            <a href="/closet">CLOSET</a>
            <a href="/generator">GENERADOR</a>
            <a href="/cuenta" className="active">CUENTA</a>
          </div>

          <div className="navbar-dots">
            <span>●</span>
            <span>●</span>
            <span>●</span>
          </div>

        </div>
      </div>

      {/* CONTENIDO */}
      <div className="profile-grid">

        {/* COLUMNA IZQUIERDA */}
        <div className="profile-left">

          {/* FOTO DE PERFIL */}
          <div className="profile-pic"></div>

          {/* USERNAME */}
          <h2 className="profile-username">JUANPISMATA11</h2>

        </div>

        {/* COLUMNA DERECHA */}
        <div className="profile-right">

          {/* TARJETA STATS */}
          <div className="profile-card">
            <h3 className="profile-card-title">STATS</h3>
          </div>

          {/* TARJETA SETTINGS */}
          <div className="profile-card">
            <h3 className="profile-card-title">SETTINGS ⚙️</h3>
          </div>

        </div>

      </div>
    </div>
  );
}
