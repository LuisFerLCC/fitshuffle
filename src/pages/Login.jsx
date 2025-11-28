import { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { getMultiFactorResolver, TotpMultiFactorGenerator } from "firebase/auth";
import logo from "../assets/logo.png";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [signInWithEmailAndPassword, , , error] = useSignInWithEmailAndPassword(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [is2faPrompt, setIs2faPrompt] = useState(false);

  useEffect(() => {
    if (error?.code === "auth/invalid-credential") {
      setErrorMessage("CREDENCIALES INCORRECTAS")
    }

    if (error?.code === "auth/multi-factor-auth-required") {
      setErrorMessage("");
      setIs2faPrompt(true);
    }

    if (error?.code === "auth/too-many-requests") {
      setErrorMessage("DEMASIADOS INTENTOS. VUELVA A INTENTAR MÁS TARDE.")
    }
  }, [error]);

  async function onSubmit(e) {
    e.preventDefault();
    await signInWithEmailAndPassword(email, password);
  }

  async function on2faSubmit(e) {
    e.preventDefault();

    const mfaResolver = getMultiFactorResolver(auth, error);
    const uid = mfaResolver.hints[0].uid;
    const multiFactorAssertion =
      TotpMultiFactorGenerator.assertionForSignIn(uid, otp);

    return mfaResolver.resolveSignIn(multiFactorAssertion).then(() => {
      navigate("/inicio");
    }).catch(err => {
      if (err?.code === "auth/invalid-verification-code") {
        setErrorMessage("CÓDIGO INCORRECTO")
      }

      if (err?.code === "auth/too-many-requests") {
        setErrorMessage("DEMASIADOS INTENTOS. VUELVA A INTENTAR MÁS TARDE.")
      }
    });
  }

  return (
    <div className="auth-container">

      {/* LOGO */}
      <img src={logo} alt="fitshuffle logo" className="auth-logo" />

      {/* FORMULARIO */ }
      {
        is2faPrompt ?
          <form className="auth-form" onSubmit={on2faSubmit}>
            <label className="auth-label">Código de autenticación</label>
            <input
              type="text"
              className="auth-input"
              placeholder="6 dígitos"
              value={otp}
              onChange={e => setOtp(e.target.value)}
            />

            { errorMessage &&
              <p className="auth-error">
                {errorMessage}
              </p>
            }

            <button type="submit" className="auth-button">
              INICIAR SESIÓN
            </button>
          </form>
        :
        <form className="auth-form" onSubmit={onSubmit}>

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

          { errorMessage &&
            <p className="auth-error">
              {errorMessage}
            </p>
          }

          <button type="submit" className="auth-button">
            INICIAR SESIÓN
          </button>

        </form>
      }

      {/* LINK */}
      <p className="auth-alt">
        ¿No tienes cuenta? <Link to="/signup">Crea una aquí</Link>
      </p>

    </div>
  );
}
