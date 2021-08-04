import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import WrapperTabela from './WrapperTabela/WrapperTabela';
import TabelaCrud from './TabelaCrud/TabelaCrud';
import AdicionarRegistro from './AdicionarRegistro/AdicionarRegistro';
import EditarRegistro from './EditarRegistro/EditarRegistro';




const PaginaTabela = () => {
  // Paginação
  const [ pagina, setPagina ] = useState(0);

  return (
    <WrapperTabela>
      <Route exact path="/registros/lista/:page" component={TabelaCrud}></Route>
      <Route exact path="/registros" render={() => (<Redirect to="/registros/lista/0" />)} />          
      <Route exact path="/registros/novo" component={AdicionarRegistro}></Route>
      <Route exact path="/registros/editar" component={EditarRegistro}></Route>
    </WrapperTabela>
  );

}

export default PaginaTabela;