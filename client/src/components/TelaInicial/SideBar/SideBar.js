import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {

  return (
      <div className="col-md-3 col-lg-2 pe-1 d-none d-md-flex flex-column sidebar border border-secondary align-items-center min-h-100">
        <div className="d-flex flex-column position-fixed my-5 text-center text-white fw-light">
          <Link to="/"><div className="col py-2 px-3 rounded sidebar-item">Página Inicial</div></Link>
          <a href="#dashboard"><div className="col py-2 px-3 rounded sidebar-item">Dashboard</div></a>
          <Link to="/registros"><div className="col py-2 px-3 rounded sidebar-item">Meus Registros</div></Link>
          <Link to="/minha-conta"><div className="col py-2 px-3 rounded sidebar-item">Minha Conta</div></Link>
          <Link to="/sair"><div className="col py-2 px-3 rounded sidebar-item">Sair</div></Link>
        </div>
      </div>
  );

}

export default SideBar;