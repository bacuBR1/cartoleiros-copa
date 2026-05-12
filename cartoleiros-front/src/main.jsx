import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import Home from "./Pages/pages-adm/Home";
import Login from "./Pages/pages-adm/Login/Login";
import InicioAdm from "./Pages/pages-adm/inicio/inicio-adm";
import ViewCadastro from "./Pages/pages-adm/view-usuario/view-cadastro";
import CadastroUsers from "./Pages/pages-adm/cadastro-users/cadastro-users";
import DeleteUsers from "./Pages/pages-adm/delete-users/delete-users";
import ViewPalpites from "./Pages/pages-adm/view-palpite/view-palpites";
import AdcionarResultados from "./Pages/pages-adm/adcionar-resultados/adcionar-resultados";
import ViewResultados from "./Pages/pages-adm/view-resultados/view-resultados";
import ViewRanking from "./Pages/pages-adm/view-ranking/view-ranking";

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
        <Route path="/mostrar-palpites" element={<ViewPalpites />} />
        <Route path="/adcionar-resultados" element={<AdcionarResultados />} />
        <Route path="/mostrar-resultados" element={<ViewResultados />} />
        <Route path="/mostrar-ranking" element={<ViewRanking />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);