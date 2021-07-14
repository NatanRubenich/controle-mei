import React from 'react';
import TabelaCrud from './TabelaCrud/TabelaCrud';
import Header from '../Header/Header';

const PaginaTabela = () => {

  return (
    <div>
      <Header/>
    <div className="tabela-imagem">
      <div className="row min-vh-100 m-0 position-relative">
        <div className="blind"></div>
        <div className="col-11 col-md-10 mx-auto m-5 bg-light rounded justify-content-center align-items-center shadow-lg z-index2">
          <div className="container">
            <h4 className="text-center mt-4 mb-4 titulo text-uppercase">Registros</h4>
            <div className="container p-0">
              <TabelaCrud/>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );



}

export default PaginaTabela;