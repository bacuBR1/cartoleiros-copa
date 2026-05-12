import api from "../../../services/api";
import { useRef, useState, useEffect } from "react";
import "./deleteStyle.css";

function DeleteUsers() {
    useEffect(() => {
        const adm = sessionStorage.getItem("adm");
        if (!adm) {
            window.location.href = "/login-adm";
        }
    }, []);
    const [mensagem, setMensagem] = useState("");

    const inputNome = useRef();
    const inputID = useRef();

    function buttonVoltar() {
        window.location.href = "/inicio-adm";
    }

    async function deleteCadastro() {
        try {
            await api.delete('/delete-cadastro', {
                data: {
                    id: inputID.current.value,
                    nome: inputNome.current.value
                }
            });
            setMensagem("Usuário deletado com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            setMensagem("Erro ao deletar usuário.");
        }
    }

    return(
        <div>
            <button onClick={buttonVoltar}>Voltar</button>
            <h1>Deletar Usuário</h1>
            <input type="number" placeholder="ID" ref={inputID} />
            <p>ou</p>
            <input type="text" placeholder="Nome" ref={inputNome} />
            <button onClick={deleteCadastro}>Deletar</button>
            <p>{mensagem}</p>
        </div>
    )
}

export default DeleteUsers;