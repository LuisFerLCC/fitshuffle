import Navbar from "../components/Navbar";
import "../styles/perfil.css";

import { FiLogOut, FiHeart, FiSettings, FiBarChart2 } from "react-icons/fi";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { multiFactor } from "firebase/auth";

export default function Profile() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  const hasMfa = useMemo(() => {
    return multiFactor(user).enrolledFactors.length > 0
  }, [user]);

  function handleLogout() {
    signOut();
    navigate("/");
  }

  return (
    <div className="profile-page black-bg">
      <Navbar cuentaActive dark={true} />

      <div className="profile-grid-figma">

        {/* CARD DEL PERFIL */}
        <div className="card-profile">
          <div className="circle-deco"></div>

          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut size={26} />
          </button>

          <h1 className="profile-username">
            {user?.displayName ?? user?.email}
          </h1>
        </div>

        {/* OUTFIT CARD */}
        <div className="card-outfit">
          <FiHeart size={28} className="heart" />

          <p className="outfit-title">THE NORMAL</p>
          {/* <a href="#" className="outfit-link">See All →</a> */}
        </div>

        {/* STATS — SIN DASHBOARD */}
        <div className="card-small">
          <div className="icon-row">
            <FiBarChart2 size={24} className="card-icon" />
            <h2 className="card-small-title">STATS</h2>
          </div>
        </div>

        {/* SETTINGS */}
        <div className="card-small card-settings">
          <div className="icon-row">
            <FiSettings size={24} className="card-icon" />
            <h2 className="card-small-title">SETTINGS</h2>
          </div>

          { !hasMfa &&
            <Link to="/mfa" className="btn-light">
              VERIFICACIÓN EN 2 PASOS
            </Link>
          }
        </div>

      </div>
    </div>
  );
}
