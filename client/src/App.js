import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import PaginaLogin from './components/PaginaLogin/PaginaLogin';
import TelaInicial from './components/TelaInicial/TelaInicial';
import PaginaCadastro from './components/PaginaCadastro/PaginaCadastro';
import PaginaTabela from './components/PaginaTabela/PaginaTabela';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={TelaInicial} />
          <Route path="/login" exact component={PaginaLogin} />
          <Route path="/cadastro" exact component={PaginaCadastro} />
          <Route path="/registros" exact component={PaginaTabela} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;