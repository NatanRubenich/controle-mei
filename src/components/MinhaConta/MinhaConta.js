import React from 'react';

import PagPadrao from '../PagPadrao/PagPadrao';
import FormCadastro from '../PaginaCadastro/FormCadastro/FormCadastro';

const PaginaLogin = () => {

  return (
    <PagPadrao titulo="Minha Conta" background="login-imagem">
      <FormCadastro/>
    </PagPadrao>
  );

}



export default PaginaLogin;