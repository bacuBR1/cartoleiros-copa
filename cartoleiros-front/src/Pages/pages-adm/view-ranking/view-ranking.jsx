import api from "../../../services/api";
import { useEffect, useState } from "react";
import "./ranking.css";

function ViewRanking() {
    const [ranking, setRanking] = useState([]);
    function mostrarRanking() {
        try {
            api.get("/mostrar-ranking").then((response) => {
                setRanking(response.data);
                console.log(response.data);
            });
        } catch (error) {
            console.error("Erro ao buscar ranking:", error);
        }
    }
    useEffect(() => {
        
            const adm = sessionStorage.getItem("adm");
            if (!adm) {
                window.location.href = "/login-adm";
            }

        mostrarRanking();
    }, []);
    return (
        <div>
            <h1>Ranking</h1>
            <p>Esta é a página do ranking.</p>
            <table>
                <thead>
                    <tr>
                        <th>Posição</th>
                        <th>nome</th>
                        <th>Pontos</th>
                    </tr>
                </thead>
                <tbody>
                    {ranking.map((ranking, index) => (
                        <tr key={ranking.id}>
                            <td>{index + 1}</td>
                            <td>{ranking.Cadastro?.nome}</td>
                            <td>{ranking.total_pontos}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewRanking;