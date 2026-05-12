
import { useEffect } from 'react';
import api from '../../../services/api'
import './HomeStyle.css' 

function Home() {

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await api.get('/cadastro');
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    }

    getUsers();
  }, []);

  function buttonEnterLogin() {
    window.location.href = "/login-adm";
  }
  
  function buttonEnterInicioUser() {
    window.location.href = "/inicio-user";
  }

  return (
    <section>
      <div className='home'>
        <h1>Bem-vindo à Página Inicial</h1>

        <button onClick={buttonEnterLogin}>Entrar como ADM</button>
        <button onClick={buttonEnterInicioUser}>Entrar como Usuário</button>
      </div>
    </section>
  )
}

export default Home;