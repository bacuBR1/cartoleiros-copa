import { useEffect, useState, useRef } from 'react';
import { useNavigate} from 'react-router-dom';
import './style.css'
import api from '../../services/api'

function Home() {
  const navigate = useNavigate();

const inputNome = useRef();
const inputSenha = useRef();

  async function  postUsers() {
    try {
      const response = await api.post('/login-adm', {
        nome: inputNome.current.value,
        senha: inputSenha.current.value
      });
      
      if (response.data.success) {
        navigate("/pagina-inicial");
      }

    } catch (error) {
      console.error("Erro ao realizar login:", error);
    }
  }

  
  return (
  <div>
    <div className='titulo'>
        <h1>cartoleiros</h1>
    </div>

    <div className='formulario'>
        <h2>Login ADM</h2>
            <form action="">
                <input type="text" placeholder="Usuário" ref={inputNome} />
                <input type="password" placeholder="Senha" ref={inputSenha} />
                <button type="button" onClick={postUsers}>Entrar</button> 
            </form>
    </div>
  </div>  
    )
}

export default Home
