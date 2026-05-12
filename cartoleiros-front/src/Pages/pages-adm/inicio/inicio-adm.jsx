import './InicioStyle.css'
import { useEffect } from 'react';

function InicioAdm() {
    useEffect(() => {
        const adm = sessionStorage.getItem("adm");
        if (!adm) {
            window.location.href = "/login-adm";
        }
    }, []);

    function buttonGerenciarUsuarios() {
        window.location.href = "/view-cadastro";
    }

    function cadastrarUsuarios() {
        window.location.href = "/cadastro-users";
    }

    function removerUsuarios() {
        window.location.href = "/delete-cadastro";
    }


    function gerenciarPalpites() {
        window.location.href = "/mostrar-palpites";
    }
    
    function gerenciarResultados() {
        window.location.href = "/mostrar-resultados";
    }

    function gerenciarRanking() {
        window.location.href = "/mostrar-ranking";
    }

    


    return (
        <div className='inicio-adm'>
            <h1>Bem-vindo, ADM!</h1> 

            <div>
                <ul>
                    <li><button onClick={buttonGerenciarUsuarios}>Gerenciar usuarios</button></li>
                    <li><button onClick={cadastrarUsuarios}>Cadastrar usuarios</button></li>
                    <li><button onClick={removerUsuarios}>Remover usuarios</button></li>
                    <li><button onClick={gerenciarPalpites}>Gerenciar palpites</button></li>
                    <li><button onClick={gerenciarResultados}>Gerenciar resultados</button></li>
                    <li><button onClick={gerenciarRanking}>Gerenciar ranking</button></li>
                </ul>
            </div>
        </div>

    )
}

export default InicioAdm;