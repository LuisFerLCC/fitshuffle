import logo from "../assets/logo.png";

export default function Login() {
  return (
    <div className="auth-container">

      {/* LOGO */}
      <img src={logo} alt="fitshuffle logo" className="auth-logo" />

      {/* FORMULARIO */}
      <form className="auth-form">

        <label className="auth-label">Correo electrónico</label>
        <input
          type="email"
          className="auth-input"
          placeholder="tucorreo@mail.com"
        />

        <label className="auth-label">Contraseña</label>
        <input
          type="password"
          className="auth-input"
          placeholder="••••••••"
        />

        <button type="submit" className="auth-button">
          INICIAR SESIÓN
        </button>

      </form>

      {/* LINK */}
      <p className="auth-alt">
        ¿No tienes cuenta? <a href="/signup">Crea una aquí</a>
      </p>

    </div>
  );
}
