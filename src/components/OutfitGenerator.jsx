import { collection, doc, updateDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { useHttpsCallable } from "react-firebase-hooks/functions";
import { useLocation } from "react-router-dom";
import { firestore, functions } from "../firebase";
import "../styles/outfit-generator.css";
import { GarmentCard } from "./GarmentCard";


export default function OutfitGenerator() {
  const location = useLocation();
  const initialOutfit = location.state;

  // Estado para el outfit actual
  const [outfit, setOutfit] = useState(initialOutfit);
  const [name, setName] = useState(initialOutfit?.nombre ?? "");

  const [generateRandomOutfit, , error] = useHttpsCallable(functions, "generateRandomOutfit");
  useEffect(() => {console.error(error)}, [error])

  // Estado para contar intentos
  const [intentos, setIntentos] = useState(0);
  const [agotado, setAgotado] = useState(false);

  // Estado para animación de ruletas
  const [girando, setGirando] = useState(false);

  // Función para generar outfit aleatorio
  async function generarOutfit() {
    if (agotado)
      return;

    // Validar límite de intentos
    if (intentos >= 5) {
      setAgotado(true);
      return;
    }

    // Activar animación de giro
    setGirando(true);

    const result = await generateRandomOutfit();
    setOutfit(result.data);
    setName(result.data.nombre)
    setGirando(false);
    setIntentos(intentos => intentos + 1);
  }


  const garments = useMemo(() => {
    return outfit?.prendas ?? []
  }, [outfit])
  useEffect(() => console.log(garments), [garments])

  async function onNameBlur(e) {
    await updateDoc(doc(collection(firestore, "outfits"), outfit.outfitId), {
      nombre: name
    });
  }

  return (
    <div className="outfit-generator-container">
      {/* MENSAJE PREMIUM */}
      {agotado && (
        <div className="premium-message">
          <h2>¡Te acabaste tus pruebas gratuitas! </h2>
          <p>Aprovecha ahora y conviértete en <strong>PREMIUM</strong></p>
          <p>Acceso ilimitado a generación de outfits personalizados</p>
          <button className="btn-premium">UPGRADE A PREMIUM</button>
        </div>
      )}

      {/* GENERADOR */}
      {!agotado && (
        <div className="generator-main">
          {/* BOTÓN GENERAR - ARRIBA */}
          <button
            className={`btn-generar ${girando ? "girando" : ""}`}
            onClick={generarOutfit}
            disabled={girando}
          >
            {girando ? "GENERANDO..." : "GENERAR"}
          </button>

          {/* CONTADOR DE INTENTOS */}
          <div className="intentos-badge">
            {5 - intentos} intentos
          </div>

          <input id="outfit-name" type="text" value={name} onChange={e => setName(e.target.value)} onBlur={onNameBlur} />

          <div className="closet-grid">
            {garments.map(garment => <GarmentCard key={garment.id} id={garment.id} data={garment} dark />) }
          </div>
        </div>
      )}
    </div>
  );
}
