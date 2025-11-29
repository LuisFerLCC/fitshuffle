import Navbar from "../components/Navbar";
import "../styles/stats.css";

import { FiBarChart2, FiPieChart, FiTrendingUp, FiUser } from "react-icons/fi";
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";
import { query, collection, where } from "firebase/firestore";
import { auth, firestore } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useMemo } from "react";

export default function Stats() {
  const [user] = useAuthState(auth);
  const [garmentsSnapshot] = useCollection(
    query(
      collection(firestore, "prendas"),
      where("idUsuario", "==", user.uid),
    )
  );
  const [outfits] = useCollectionData(
    query(
      collection(firestore, "outfits"),
      where("idUsuario", "==", user.uid),
    )
  );

  const generatedOutfits = useMemo(() => {
    return outfits?.length ?? 0
  }, [outfits]);

  const savedGarments = useMemo(() => {
    const garments = garmentsSnapshot?.docs.map(doc => doc.data());
    return garments?.length ?? 0
  }, [garmentsSnapshot]);

  const mostUsedGarment = useMemo(() => {
    const garments = garmentsSnapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (!garments) return;

    const garmentUses = {};
    const outfitsData = outfits ?? [];
    const garmentsData = garments ?? [];

    for (const outfit of outfitsData) {
      for (const garmentId of outfit.idsPrendas) {
        if (!(garmentId in garmentUses)) garmentUses[garmentId] = 0;
        garmentUses[garmentId] += 1
      }
    }

    let mostUsedId = "";
    Object.keys(garmentUses).forEach(garmentId => {
      const maxSoFar = garmentUses[mostUsedId] ?? 0;
      const nextUses = garmentUses[garmentId];
      if (nextUses > maxSoFar) mostUsedId = garmentId;
    });

    return garments.find(garment => garment.id === mostUsedId)
  }, [garmentsSnapshot, outfits]);

  const daysSinceSignup = useMemo(() => {
    if (!user?.metadata?.creationTime) return 0;
    const creationDate = new Date(user.metadata.creationTime);
    const now = new Date();
    const diffTime = Math.abs(now - creationDate);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }, [user]);

  return (
    <div className="stats-page light-bg">

      <Navbar dark={false} />

      <h1 className="stats-title">ESTADÍSTICAS</h1>

      <div className="stats-grid">

        <div className="stat-card">
          <FiBarChart2 size={32} />
          <h2>Outfits Generados</h2>
          <p>{ generatedOutfits }</p>
        </div>

        <div className="stat-card">
          <FiPieChart size={32} />
          <h2>Prendas Guardadas</h2>
          <p>{ savedGarments }</p>
        </div>

        <div className="stat-card">
          <FiTrendingUp size={32} />
          <h2>Prenda Más Usada</h2>
          <p>{ mostUsedGarment?.nombre ?? "Ninguno" }</p>
        </div>

        <div className="stat-card">
          <FiUser size={32} />
          <h2>Días Activo</h2>
          <p>{ daysSinceSignup }</p>
        </div>

      </div>
    </div>
  );
}
