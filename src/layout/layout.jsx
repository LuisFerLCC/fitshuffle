import Navbar from "../components/Navbar";

export default function Layout({ children, mode = "light" }) {
  return (
    <>
      {/* HEADER SIEMPRE FUERA DEL CONTENEDOR */}

      <Navbar mode={mode} />

      {/* CONTENIDO GLOBAL */}
      <div className="page-content">
        {children}
      </div>
    </>
  );
}
