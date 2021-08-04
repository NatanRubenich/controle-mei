import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RotaPrivada from './components/RotaPrivada/RotaPrivada';
import LoginProvider from './Context/LoginContext';
import AtualizarStateUsuario from './components/AtualizarStateUsuario/AtualizarStateUsuario';

import Header from './components/Header/Header';
import PaginaLogin from './components/PaginaLogin/PaginaLogin';
import TelaInicial from './components/TelaInicial/TelaInicial';
import PaginaCadastro from './components/PaginaCadastro/PaginaCadastro';
import PaginaTabela from './components/PaginaTabela/PaginaTabela';
import MinhaConta from './components/MinhaConta/MinhaConta';

const App = () => {

  return (
    <LoginProvider>
      <div>
        <BrowserRouter>
          <AtualizarStateUsuario />
          <Header/>
          <Switch>
            <Route path="/" component={TelaInicial} exact/>
            <Route path="/login" component={PaginaLogin} exact/>
            <Route path="/cadastro" component={PaginaCadastro} exact/>
            <RotaPrivada path="/registros" component={PaginaTabela}/>
            <RotaPrivada path="/minhaconta" component={MinhaConta}/>
          </Switch>
        </BrowserRouter>
      </div>
    </LoginProvider>
  );
}

export default App;