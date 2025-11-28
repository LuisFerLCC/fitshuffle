import { useState } from "react";
import "../styles/outfit-generator.css";

// Mock data - Aquí van las imágenes de las prendas
const prendas = {
  headwear: [
    { id: 1, nombre: "Gorra Negra", imagen: "prenda1.jpg" },
    { id: 2, nombre: "Gorra Blanca", imagen: "prenda2.jpg" },
    { id: 3, nombre: "Gorra Roja", imagen: "prenda3.jpg" },
    { id: 4, nombre: "Gorra Azul", imagen: "prenda4.jpg" },
    { id: 5, nombre: "Gorro Lana", imagen: "prenda5.jpg" },
  ],
  top: [
    { id: 1, nombre: "Camiseta Blanca", imagen: "prenda6.jpg" },
    { id: 2, nombre: "Blusa Negra", imagen: "prenda7.jpg" },
    { id: 3, nombre: "Camisa Azul", imagen: "prenda8.jpg" },
    { id: 4, nombre: "Sudadera Gris", imagen: "prenda9.jpg" },
    { id: 5, nombre: "Polo Rojo", imagen: "prenda10.jpg" },
  ],
  bottom: [
    { id: 1, nombre: "Pantalón Negro", imagen: "prenda11.jpg" },
    { id: 2, nombre: "Jeans Azul", imagen: "prenda12.jpg" },
    { id: 3, nombre: "Shorts Negros", imagen: "prenda13.jpg" },
    { id: 4, nombre: "Pantalón Beige", imagen: "prenda14.jpg" },
    { id: 5, nombre: "Falda Negra", imagen: "prenda15.jpg" },
  ],
  shoes: [
    { id: 1, nombre: "Zapatos Negros", imagen: "prenda16.jpg" },
    { id: 2, nombre: "Tenis Blancos", imagen: "prenda17.jpg" },
    { id: 3, nombre: "Botas Negras", imagen: "prenda18.jpg" },
    { id: 4, nombre: "Sandalias", imagen: "prenda19.jpg" },
    { id: 5, nombre: "Chanclas", imagen: "prenda20.jpg" },
  ],
};

export default function OutfitGenerator() {
  // Estado para el outfit actual
  const [outfit, setOutfit] = useState({
    headwear: prendas.headwear[0],
    top: prendas.top[0],
    bottom: prendas.bottom[0],
    shoes: prendas.shoes[0],
  });

  // Estado para contar intentos
  const [intentos, setIntentos] = useState(0);
  const [agotado, setAgotado] = useState(false);

  // Estado para animación de ruletas
  const [girando, setGirando] = useState(false);

  // Función para generar outfit aleatorio
  const generarOutfit = () => {
    if (agotado) return;

    // Validar límite de intentos
    if (intentos >= 5) {
      setAgotado(true);
      return;
    }

    // Activar animación de giro
    setGirando(true);

    // Simular giro de ruleta (500ms)
    setTimeout(() => {
      const nuevoOutfit = {
        headwear: prendas.headwear[Math.floor(Math.random() * prendas.headwear.length)],
        top: prendas.top[Math.floor(Math.random() * prendas.top.length)],
        bottom: prendas.bottom[Math.floor(Math.random() * prendas.bottom.length)],
        shoes: prendas.shoes[Math.floor(Math.random() * prendas.shoes.length)],
      };
      setOutfit(nuevoOutfit);
      setGirando(false);
      setIntentos(intentos + 1);
    }, 500);
  };

  return (
    <div className="outfit-generator-container">
      {/* MENSAJE PREMIUM */}
      {agotado && (
        <div className="premium-message">
          <h2>¡Te acabste tus pruebas gratuitas! </h2>
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

          {/* OUTFIT VERTICAL CENTRADO */}
          <div className="outfit-display">
            {/* HEADWEAR */}
            <div className={`prenda-slot headwear ${girando ? "spin" : ""}`}>
              <img src={`/imagenes/${outfit.headwear.imagen}`} alt={outfit.headwear.nombre} />
              <span className="prenda-label">HEADWEAR</span>
            </div>

            {/* TOP */}
            <div className={`prenda-slot top ${girando ? "spin" : ""}`}>
              <img src={`/imagenes/${outfit.top.imagen}`} alt={outfit.top.nombre} />
              <span className="prenda-label">TOP</span>
            </div>

            {/* BOTTOM */}
            <div className={`prenda-slot bottom ${girando ? "spin" : ""}`}>
              <img src={`/imagenes/${outfit.bottom.imagen}`} alt={outfit.bottom.nombre} />
              <span className="prenda-label">BOTTOM</span>
            </div>

            {/* SHOES */}
            <div className={`prenda-slot shoes ${girando ? "spin" : ""}`}>
              <img src={`/imagenes/${outfit.shoes.imagen}`} alt={outfit.shoes.nombre} />
              <span className="prenda-label">SHOES</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
