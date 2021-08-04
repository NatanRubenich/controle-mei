import React from 'react';
import { useLogin } from '../../../Context/LoginContext';
import { useHistory } from 'react-router-dom';


const AtualizarStateUsuario = () => {
  const { logado, setLogado } = useLogin();
  let historico = useHistory();

  const handleSair = () => {
    localStorage.clear();
    setLogado(false);
    historico.push('/');
  }

  return (
    <a href="#" className="nav-link cursor" onClick={handleSair}>Sair</a>
  );
}

export default AtualizarStateUsuario;
