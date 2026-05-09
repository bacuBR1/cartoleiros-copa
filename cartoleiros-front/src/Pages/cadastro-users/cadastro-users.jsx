import api from "../../services/api";
import { useRef, useState } from "react";
import "./cadastroStyle.css"; 

function CadastroUsers() {
    const [mensagem, setMensagem] = useState("");
    const inputNome = useRef();
    const inputTelefone = useRef();

    function buttonVoltar() {
        window.location.href = "/inicio-adm";
    }

    async function postCadastro() {
        try {
            const response = await api.post('/cadastro', {
                nome: inputNome.current.value,
                N_telefone: inputTelefone.current.value
            });

            console.log("Usuário cadastrado:", response.data);
            inputNome.current.value = "";
            inputTelefone.current.value = "";
            setMensagem("Usuário cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            setMensagem("Erro ao cadastrar usuário.");
        }
    }

    return(
        <div>
            <button onClick={buttonVoltar}>Voltar</button>
            <h1>Cadastro de Usuários</h1>
            <input type="text" placeholder="Nome" ref={inputNome} />
            <input type="text" placeholder="Telefone" ref={inputTelefone} />
            <button onClick={postCadastro}>Cadastrar</button>
            <p>{mensagem}</p>
        </div>
    )
}

export default CadastroUsers;