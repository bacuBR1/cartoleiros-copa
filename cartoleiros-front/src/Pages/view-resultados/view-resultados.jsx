import api from "../../services/api";
import { useEffect, useState } from "react";
import "./view-resultados.css";

function ViewResultados() {
const [resultados, setResultados] = useState([]);
    function buttonVoltar() {
        window.location.href = "/inicio-adm";
    }

    function buttonAdicionarResultados() {
        window.location.href = "/adcionar-resultados";
    }

    
    function mostrarResultados() {
        try {
            api.get("/mostrar-resultados").then((response) => {
                setResultados(response.data);
                console.log(response.data);
            });
        } catch (error) {
            console.error("Erro ao buscar resultados:", error);
        }
    }
    useEffect(() => {
        mostrarResultados();
    }, []);

    return(
        <div>
            <button onClick={buttonVoltar}>Voltar</button>
            <button onClick={buttonAdicionarResultados}>Adicionar Resultados</button>
            <h1>Resultados</h1>
            <p>Esta é a página de resultados.</p>

            <ul>
                {resultados.map((resultado) => (
                    <li key={resultado.id}>
                        {"ID do Jogo: "}{resultado.jogo_id} -
                        {resultado.Jogo?.selecao_a?.nome} {resultado.gols_a} x {resultado.gols_b} {resultado.Jogo?.selecao_b?.nome}
                        {" - Vencedor: "}{resultado.vencedor?.nome ?? "Empate"}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ViewResultados;