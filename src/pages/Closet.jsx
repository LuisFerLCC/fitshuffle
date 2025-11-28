import { useState } from "react";
import logo from "../assets/logo.png";

export default function Closet() {

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="page closet-page">

      {/* HEADER */}
      <div className="navbar-exact">
        <div className="navbar-inner">
          <div className="navbar-logo">
            <img src={logo} alt="fitshuffle logo" />
          </div>

          <div className="navbar-links">
            <a href="/inicio">INICIO</a>
            <a href="/closet" className="active">CLOSET</a>
            <a href="/generator">GENERADOR</a>
            <a href="/cuenta">CUENTA</a>
          </div>

          <div className="navbar-dots">
            <span>●</span>
            <span>●</span>
            <span>●</span>
          </div>
        </div>
      </div>

      {/* TITULO CLOSET */}
      <div className="closet-header">
        <h1 className="closet-title">CLOSET</h1>
        <button className="closet-add" onClick={() => setShowModal(true)}>+</button>
      </div>

      {/* FILTROS */}
      <div className="closet-filters">
        <div className="filter-chip active">Todo</div>
        <div className="filter-chip">Camisas</div>
        <div className="filter-chip">Pantalones</div>
        <div className="filter-chip">Zapatos</div>
        <div className="filter-chip">Accesorios</div>
      </div>

      {/* GRID */}
      <div className="closet-grid">
        <div className="closet-item"></div>
        <div className="closet-item"></div>
        <div className="closet-item"></div>
        <div className="closet-item"></div>
        <div className="closet-item"></div>
        <div className="closet-item"></div>
      </div>

    {/* MODAL SUBE TU ROPA */}
    {showModal && (
    <div className="modal-bg" onClick={() => setShowModal(false)}>

        <div className="modal-box-upload" onClick={(e) => e.stopPropagation()}>

        {/* Botón cerrar abajo derecha */}
        <button className="modal-close-exact" onClick={() => setShowModal(false)}>
            ×
        </button>

        <h2 className="modal-upload-title">SUBE TU ROPA</h2>

        <p className="modal-upload-subtitle">
            ASEGURATE DE QUE TUS IMAGENES SEAN CLARAS Y CON UN FONDO <br />
            CLARO PARA UN MEJOR RESULTADO.
        </p>

        <div className="modal-upload-buttons">
            <button className="modal-upload-btn">SUBE TU ARCHIVO</button>
            <button className="modal-upload-btn">TOMA LA FOTO</button>
        </div>

        <div className="modal-upload-icons">
            <div className="upload-icon">📁</div>
            <div className="upload-icon">📷</div>
        </div>

        </div>

    </div>
    )}

    </div>
  );
}
