import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import InicioAdm from "./Pages/inicio/inicio-adm";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pagina-inicial" element={<Home />} />
        <Route path="/login-adm" element={<Login />} />
        <Route path="/inicio-adm" element={<InicioAdm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);