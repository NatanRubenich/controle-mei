import React from 'react';
import { Route, useHistory } from 'react-router-dom';


const RotaPrivada = ({url, component, exact}) => {
  let historico = useHistory();

  return (
    <>
      {localStorage.getItem("token") ? <Route path={url} component={component} exact={exact ? true : false}/> : historico.push('/login') }
    </>
  )
}

export default RotaPrivada;
