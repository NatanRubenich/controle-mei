import React from 'react';
import SideNav from '../SideNav/SideNav';


const TelaInicial = () => {

  return (
    <div className="row m-0 min-vh-100 hero-image align-items-center">
      <div className="blind"></div>
      <div className="col-1 d-none d-md-flex"></div>
      <div className="col-9 col-md-5 mx-auto mx-md-1 text-center text-md-start z-index2">
        <h1 className="my-4 display-3">Controle MEI</h1>
        <p className="my-4 ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
        <div className="d-flex flex-column flex-md-row gap-2 justify-content-start mb-4 ">
          <button class="btn btn-success py-2 me-md-2" type="button">Fazer Login</button>
          <button class="btn btn-dark py-2" type="button">Inscreva-se</button>
        </div>
      </div>
    </div>
  
  );
}



export default TelaInicial;