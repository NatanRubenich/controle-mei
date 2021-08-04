import { useEffect } from 'react';
import { useLogin } from '../../Context/LoginContext';

const AtualizarStateLogin = () => {
  const { logado, setLogado } = useLogin();

  useEffect(() => {
    if(localStorage.getItem("token")) {
      setLogado(true);
      console.log('logado', true);
    }
  }, [logado]);

  return null;
}

export default AtualizarStateLogin;
