import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import InicioAdm from "./Pages/inicio/inicio-adm";
import ViewCadastro from "./Pages/view-usuario/view-cadastro";
import CadastroUsers from "./Pages/cadastro-users/cadastro-users";
import DeleteUsers from "./Pages/delete-users/delete-users";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pagina-inicial" element={<Home />} />
        <Route path="/login-adm" element={<Login />} />
        <Route path="/inicio-adm" element={<InicioAdm />} />
        <Route path="/view-cadastro" element={<ViewCadastro />} />
        <Route path="/cadastro-users" element={<CadastroUsers />} />
        <Route path="/delete-cadastro" element={<DeleteUsers />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);