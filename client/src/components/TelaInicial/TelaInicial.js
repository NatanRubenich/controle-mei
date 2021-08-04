import React from 'react';
import { useLogin } from '../../Context/LoginContext';

import SideBar from './SideBar/SideBar';
import Hero from './Hero/Hero';
import Dashboard from './Dashboard/Dashboard';


const TelaInicial = () => {
  const { logado, setLogado } = useLogin();

  return (
    <div className="row m-0">
      {logado && <SideBar/>}
      <div className="col p-0">
        <Hero/>
        {logado && <Dashboard />}
      </div>
    </div>
  );
}



export default TelaInicial;