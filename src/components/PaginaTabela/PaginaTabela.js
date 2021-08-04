import React from 'react';
import { Route } from 'react-router-dom';

import WrapperTabela from './WrapperTabela/WrapperTabela';
import TabelaCrud from './TabelaCrud/TabelaCrud';
import AdicionarRegistro from './AdicionarRegistro/AdicionarRegistro';



const PaginaTabela = () => {


  return (
    <WrapperTabela>
      <Route path="/registros" exact component={TabelaCrud}></Route>
      <Route path="/registros/novo" exact component={AdicionarRegistro}></Route>
    </WrapperTabela>
  );

}

export default PaginaTabela;