import api from "../../services/api";
import { useEffect, useState } from "react";

function ViewPalpites() {
    const [palpites, setPalpites] = useState([]);

    useEffect(() => {
        async function getPalpites() {
            try {
                const response = await api.get("/mostrar-palpites");
                const palpites = response.data;
                setPalpites(palpites);
                console.log(palpites);
            } catch (error) {
                console.error("Erro ao buscar palpites:", error);
            }
        }
        getPalpites();
    }, []);

    return (
        <div>
                    <h1>Palpites</h1>

        {palpites.map((palpite) => (

            <div key={palpite.id}>

                <p>Usuário: {palpite.Cadastro?.nome}</p>

                <p>
                    {"jogo da rodada"} {palpite.Jogo?.rodada} - 
                    {palpite.Jogo?.selecao_a?.nome} x {palpite.Jogo?.selecao_b?.nome} - Gols:
                    {palpite.gols_palpite_a}
                    {" x "}
                    {palpite.gols_palpite_b}
                </p>

            </div>

        ))}

        </div>
    )
}

export default ViewPalpites;