import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas
import Home from "./pages/Home";          // pantalla con video
import Home2 from "./pages/Home2";        // UPLOAD.SHUFLE.SLAY
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Closet from "./pages/Closet";      // cuando esté lista
import Generator from "./pages/Generator"; 
import Profile from "./pages/Profile";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PÁGINA PRINCIPAL (VIDEO) */}
        <Route path="/" element={<Home />} />

        {/* PÁGINA PRINCIPAL INTERNA */}
        <Route path="/inicio" element={<Home2 />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* RUTAS INTERNAS */}
        <Route path="/closet" element={<Closet />} />
        <Route path="/generator" element={<Generator />} />

        {/* NOT FOUND */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />

        <Route path="/cuenta" element={<Profile />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
