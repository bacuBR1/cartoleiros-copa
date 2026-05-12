import { useRef, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import './LoginStyle.css'
import api from '../../../services/api'

function Login() {
  const navigate = useNavigate();

const inputNome = useRef();
const inputSenha = useRef();

const [mensagem, setMensagem] = useState([]);

  async function  postUsers() {
    try {
      const response = await api.post('/login-adm', {
        nome: inputNome.current.value,
        senha: inputSenha.current.value
      });
      
      if (response.data.success) {
        if (response.data.success) {
          sessionStorage.setItem("adm", response.data.adm.nome);
           navigate("/inicio-adm");
        }
      }

    } catch (error) {
      setMensagem("Erro ao realizar login. Por favor, tente novamente.");
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
                <p>{mensagem}</p>
            </form>
    </div>
  </div>  
    )
}

export default Login
