import axios from '../../axios/axios';
import { useHistory } from 'react-router-dom';
import { useLogin } from '../../Context/LoginContext';



const verificarAuth = async () => {
  const historico = useHistory();
  const { logado, setLogado } = useLogin();

  if(localStorage.getItem("token")) {
    await axios({
      method: 'get',
      url: '/auth',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(() => {
      return true;
    })
    .catch(err => {
      if(err.response.status === 401) {
        localStorage.clear();
        setLogado(false);
        historico.push('/');
      }
    });
  } else {
    console.log('Erro ao requisitar registros');
  }
}

export default verificarAuth;
