import api from "../../services/api";
import { useRef, useState } from "react";
import "./resultadosStyle.css";

function AdcionarResultados() {
    const jogo_id = useRef();
    const gols_a = useRef();
    const gols_b = useRef();
    const [mensagem, setMensagem] = useState("");

    async function adicionarResultados() {
        const jogoIdVal = Number(jogo_id.current.value);
        const golsAVal = Number(gols_a.current.value);
        const golsBVal = Number(gols_b.current.value);

        if (!jogoIdVal || isNaN(golsAVal) || isNaN(golsBVal)) {
            setMensagem("Preencha todos os campos corretamente.");
            return;
        }

        try {
            const response = await api.post("/adcionar-resultado", {
                jogo_id: jogoIdVal,
                gols_a: golsAVal,
                gols_b: golsBVal
            });
            console.log(response.data);
            setMensagem("Resultado adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar resultado:", error);
            setMensagem("Erro ao adicionar resultado.");
        }
    }

    function buttonVoltar() {
        window.location.href = "/inicio-adm";
    }

    function buttonMostrarResultados() {
        window.location.href = "/mostrar-resultados";
    }
    return (
        <div className="resultados">
            <h1>Adicionar Resultados</h1>
            <button onClick={buttonVoltar}>Voltar</button>
            <input type="number" placeholder="ID do Jogo" ref={jogo_id} />
            <input type="number" placeholder="Gols da Seleção A" ref={gols_a} />
            <input type="number" placeholder="Gols da Seleção B" ref={gols_b} />
            <button onClick={adicionarResultados}>Adicionar Resultado</button>
            <p>{mensagem}</p>
            <button onClick={buttonMostrarResultados}>Mostrar Resultados</button>
        </div>
    );
}

export default AdcionarResultados;