import logo from "../assets/logo.png";

export default function Signup() {
  return (
    <div className="auth-container">

      {/* LOGO */}
      <img src={logo} alt="fitshuffle logo" className="auth-logo" />

      {/* FORMULARIO */}
      <form className="auth-form">

        <label className="auth-label">Usuario</label>
        <input
          type="text"
          className="auth-input"
          placeholder="Tu usuario"
        />

        <label className="auth-label">Contraseña</label>
        <input
          type="password"
          className="auth-input"
          placeholder="••••••••"
        />

        <label className="auth-label">Confirmar contraseña</label>
        <input
          type="password"
          className="auth-input"
          placeholder="••••••••"
        />

        <button type="submit" className="auth-button">
          CREAR CUENTA
        </button>

      </form>

      {/* LINK */}
      <p className="auth-alt">
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
      </p>

    </div>
  );
}
