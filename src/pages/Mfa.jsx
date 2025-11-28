import { multiFactor, TotpMultiFactorGenerator } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import { useAuthState, useSendEmailVerification, useSignOut } from "react-firebase-hooks/auth";
import { useNavigate, } from "react-router-dom"
import { auth } from "../firebase";
import logo from "../assets/logo.png"
import QRCode from "react-qr-code";

export default function Mfa() {
  const navigate = useNavigate();

  const [user] = useAuthState(auth);
  const [sendEmailVerification, , error] = useSendEmailVerification(auth);
  const [signOut] = useSignOut(auth);
  const isEmailVerified = useMemo(() => {
    return !!(user?.emailVerified)
  }, [user]);

  const [otp, setOtp] = useState("");
  const [qrUri, setQrUri] = useState("");
  const [totpSecret, setTotpSecret] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!user) return;
    if (!isEmailVerified) { sendEmailVerification(); return; }

    (async () => {
      try {
        const multiFactorSession = await multiFactor(user).getSession();
        const totpSecret = await TotpMultiFactorGenerator.generateSecret(
          multiFactorSession
        );
        const totpUri = totpSecret.generateQrCodeUrl(
          user.email,
          "fitshuffle"
        );

        setQrUri(totpUri);
        setTotpSecret(totpSecret);
      } catch (err) {
        if (err?.code === "auth/requires-recent-login") {
          signOut();
          navigate("/login");
        }

        if (err?.code === "auth/too-many-requests") {
          setErrorMessage("DEMASIADOS INTENTOS. VUELVA A INTENTAR MÁS TARDE.")
        }
      }
    })();
  }, [isEmailVerified, user, navigate, sendEmailVerification, signOut]);

  useEffect(() => {
    if (error?.code === "auth/requires-recent-login") {
      signOut();
      navigate("/login");
    }

    if (error?.code === "auth/too-many-requests") {
      setErrorMessage("DEMASIADOS INTENTOS. VUELVA A INTENTAR MÁS TARDE.")
    }
  }, [error, navigate, signOut]);

  async function onSubmit(e) {
    e.preventDefault();

    const multiFactorAssertion =
      TotpMultiFactorGenerator.assertionForEnrollment(
        totpSecret,
        otp
      );

    return multiFactor(user).enroll(multiFactorAssertion, "App TOTP").then(() => {
      alert("Verificación en 2 pasos configurada correctamente.");
      navigate("/cuenta");
    }).catch(err => {
      console.error(err);

      if (err?.code === "auth/invalid-verification-code") {
        setErrorMessage("CÓDIGO INCORRECTO")
      }
    });
  }

  return (
    <div className="auth-container">

      {/* LOGO */}
      <img src={logo} alt="fitshuffle logo" className="auth-logo" />

      {/* FORMULARIO */}
      {
        isEmailVerified ?
        <form className="auth-form" onSubmit={onSubmit}>

          <p className="auth-info">
            Escanea este código QR con tu app de autenticación:
          </p>

          { qrUri &&
            <div className="qr-container">
              <QRCode
                value={qrUri}
                size={192}
                />
            </div>
          }

          <p className="auth-info">
            O ingresa manualmente el siguiente código:
          </p>
          <input
            type="text"
            className="auth-input"
            value={totpSecret?.secretKey ?? ""}
            disabled
          />

          <p className="auth-info">
            Ingresa aquí el código generado por la app:
          </p>
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
            AGREGAR APP DE AUTENTICACIÓN
          </button>

        </form> : <form className="auth-form">

          <p className="auth-info">
              Recibiste un correo electrónico de verificación. Verifica tu
              dirección de correo electrónico antes de continuar.
          </p>

        </form>
      }

    </div>
  );
}
