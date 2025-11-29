import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../firebase"

import homePhoto from "../assets/home-photo.jpg";
import Navbar from "../components/Navbar";
import { useMemo } from "react";
import { OutfitCard } from "../components/OutfitCard";

export default function Home2() {
  const [user] = useAuthState(auth);
  const [outfitsSnapshot] = useCollection(
    query(
      collection(firestore, "outfits"),
      where("idUsuario", "==", user.uid),
      orderBy("fecha", "desc"),
      limit(4)
    )
  );
  const outfits = useMemo(() => {
    return outfitsSnapshot?.docs ?? [];
  }, [outfitsSnapshot]);

  const [topOutfits, bottomOutfits] = useMemo(() => {
    return [outfits.slice(0, 2), outfits.slice(2, 4)]
  }, [outfits]);

  return (
    <div className="page">

      {/* HEADER IMPORTADO COMO COMPONENTE */}
      <Navbar inicioActive />

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
            { topOutfits.length === 0 ?
              "¡Dirígete a Closet, guarda tus prendas, y genera outfits espectaculares!" :
              "¡Echa un vistazo a algunos de tus outfits más recientes!"
            }
          </p>

          {/* TARJETAS DE OUTFIT */}
          <div className="home2-outfits-row">

            { topOutfits.map(outfit => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            )) }

          </div>

          <div className="home2-outfits-row">

            { bottomOutfits.map(outfit => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            )) }

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
