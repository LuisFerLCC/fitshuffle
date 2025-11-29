import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { auth } from "../firebase";

export default function Signup() {
  const navigate = useNavigate();

  const [createUserWithEmailAndPassword, , , error] = useCreateUserWithEmailAndPassword(auth);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.error(error);

    if (error?.code === "auth/invalid-email") {
      setErrorMessage("CORREO INVÁLIDO")
    }

    if (error?.code === "auth/weak-password") {
      setErrorMessage("LA CONTRASEÑA DEBE TENER MÍNIMO SEIS CARACTERES.")
    }

    if (error?.code === "auth/too-many-requests") {
      setErrorMessage("DEMASIADOS INTENTOS. VUELVA A INTENTAR MÁS TARDE.")
    }
  }, [error]);

  async function onSubmit(e) {
    e.preventDefault();

    if (!displayName) return setErrorMessage("INGRESA TU NOMBRE");
    if (!email) return setErrorMessage("INGRESA TU CORREO ELECTRÓNICO");
    if (!password) return setErrorMessage("INGRESA TU CONTRASEÑA");
    if (!confirmPassword) return setErrorMessage("CONFIRMA TU CONTRASEÑA");
    if (password !== confirmPassword) return setErrorMessage("LAS CONTRASEÑAS NO COINCIDEN");

    const userCredential = await createUserWithEmailAndPassword(email, password);
    if (!userCredential) return;

    await updateProfile(userCredential?.user, { displayName });
    navigate("/inicio");
  }

  return (
    <div className="auth-container">

      {/* LOGO */}
      <img src={logo} alt="fitshuffle logo" className="auth-logo" />

      {/* FORMULARIO */}
      <form className="auth-form" onSubmit={onSubmit}>

        <label className="auth-label">Tu nombre</label>
        <input
          type="text"
          className="auth-input"
          placeholder="Edgar Ejemplo"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
        />

        <label className="auth-label">Correo electrónico</label>
        <input
          type="email"
          className="auth-input"
          placeholder="edgar.ejemplo@correo.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label className="auth-label">Contraseña</label>
        <input
          type="password"
          className="auth-input"
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <label className="auth-label">Confirmar contraseña</label>
        <input
          type="password"
          className="auth-input"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />

        { errorMessage &&
          <p className="auth-error">
            {errorMessage}
          </p>
        }

        <button type="submit" className="auth-button">
          CREAR CUENTA
        </button>

      </form>

      {/* LINK */}
      <p className="auth-alt">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>

    </div>
  );
}
