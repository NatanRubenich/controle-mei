import React from 'react';

import { useLogin } from "../../../Context/LoginContext";

const TesteContext = () => {
  const { logado, setLogado } = useLogin();
  console.log(localStorage.getItem("usuario"));

  let nomeUsuario = null;
  if(logado) {
    nomeUsuario = <span className="text">Bem vindo, {localStorage.getItem("usuario")}</span>
  }

  return (
    <div className="d-none d-md-flex flex-row-reverse position-relative w-25">
      {nomeUsuario}
    </div>
  );
}

export default TesteContext;
