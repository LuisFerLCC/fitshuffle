import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";

// Páginas
import Home from "./pages/Home";          // pantalla con video
import Home2 from "./pages/Home2";        // UPLOAD.SHUFLE.SLAY
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Closet from "./pages/Closet";      // cuando esté lista
import Generator from "./pages/Generator";
import Profile from "./pages/Profile";
import Stats from "./pages/stats";

import { PublicRoute } from "./components/PublicRoute";
import Mfa from "./pages/Mfa";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PÁGINA PRINCIPAL (VIDEO) */}
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />

        {/* PÁGINA PRINCIPAL INTERNA */}
        <Route path="/inicio" element={<PrivateRoute><Home2 /></PrivateRoute>} />

        {/* AUTH */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/mfa" element={<PrivateRoute><Mfa /></PrivateRoute>} />

        {/* RUTAS INTERNAS */}
        <Route path="/closet" element={<PrivateRoute><Closet /></PrivateRoute>} />
        <Route path="/generator" element={<PrivateRoute><Generator /></PrivateRoute>} />

        {/* NOT FOUND */}
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />

        <Route path="/cuenta" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/stats" element={<PrivateRoute><Stats /></PrivateRoute>} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
