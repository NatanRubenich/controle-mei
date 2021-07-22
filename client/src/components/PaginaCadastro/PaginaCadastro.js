import React from 'react';

import PagPadrao from '../PagPadrao/PagPadrao';
import FormCadastro from './FormCadastro/FormCadastro';

const PaginaLogin = () => {

  return (
    <PagPadrao titulo="Cadastro" background="login-imagem">
      <FormCadastro/>
    </PagPadrao>
  );

}



export default PaginaLogin;