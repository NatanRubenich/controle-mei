import React from 'react';

const WrapperTabela = ({children}) => {


  return (
    <div className="tabela-imagem p-0">
      <div className="row min-vh-100 m-0 position-relative">
        <div className="blind"></div>
        {children}
      </div>
    </div>
  );



}

export default WrapperTabela;