import api from "../../services/api";
import { useEffect } from "react";
import "./view-cadastroStyle.css";
import { useState } from "react";

function ViewCadastro() {

const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await api.get('/view-cadastro');
                setUsuarios(response.data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        }

        getUsers();
    }, []);


    function buttonVoltar() {
        window.location.href = "/inicio-adm";
    }
    
    return (
        <div>
            <button onClick={buttonVoltar}>Voltar</button>
            <h1>Visualizar Cadastros</h1>
            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        <strong>{usuario.nome}</strong> - {usuario.N_telefone}
                    </li>
                ))}
            </ul>
        </div>
    )
}    

export default ViewCadastro;