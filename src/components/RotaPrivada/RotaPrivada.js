import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import verificarAuth from '../../auth/verificarAuth';


const RotaPrivada = ({url, component, exact}) => {
  let historico = useHistory();

  return (
    <>
      {verificarAuth() ? <Route path={url} component={component} exact={exact ? true : false}/> : historico.push('/login') }
    </>
  )
}

export default RotaPrivada;
