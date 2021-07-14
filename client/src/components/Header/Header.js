import React, { useState } from 'react';
import logo from '../../img/logo.png';

const Header = () => {

  const [activeItem, setActiveItem ] = useState('');

  const handleItemClick = (item) => {
    console.log('clicado, ativo:', item);
    setActiveItem(item);
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow position-relative z-index2">
      <div className="container-fluid">
        <a className="navbar-brand ms-2" href="#"><img className="logo" src={logo} /></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSandwich" aria-controls="navbarSandwich" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse flex-row-reverse me-lg-2" id="navbarSandwich">
          <div className="navbar-nav">
            <a className="nav-link" aria-current="page" href="/login">Login</a>
            <a className="nav-link" href="/cadastro">Cadastro</a>
          </div>
        </div>
      </div>
    </nav>
  );
}



export default Header;