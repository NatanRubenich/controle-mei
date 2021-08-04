import React from 'react';
import { useLogin } from '../../../Context/LoginContext';
import { Link } from 'react-router-dom';


const BotaoLogado = () => {
  
  return (
    <>
      <div className="d-flex flex-column flex-md-row gap-2 justify-content-start mb-4">
        <a href="#dashboard"><button className="btn btn bg-darkblue text-white p-3 me-md-2 fs-5" type="button">Acessar Dashboard</button></a>
      </div>
    </>
  )
}

const BotaoDeslogado = () => {
  return (
    <>
      <div className="d-flex flex-column flex-md-row gap-2 justify-content-start mb-4">
        <Link to="/login"><button className="btn btn-success py-2 me-md-2" type="button">Fazer Login</button></Link>
        <Link to="/cadastro"><button className="btn btn-dark py-2" type="button">Inscreva-se</button></Link>
      </div>
    </>
  )
}

const Hero = () => {
  const { logado, setLogado } = useLogin();

  return (

      <div className="row m-0 min-vh-100 hero-image align-items-center position-relative">
        <div className="blind-hero"></div>
        <div className="col-1 d-none d-md-flex"></div>
        <div className="col-9 col-md-5 mx-auto mx-md-1 text-center text-md-start z-index2">
          <h1 className="my-4 display-3">Controle MEI</h1>
          <p className="my-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          { logado ? BotaoLogado() : BotaoDeslogado() }
        </div>
      </div>

  );
}


export default Hero;