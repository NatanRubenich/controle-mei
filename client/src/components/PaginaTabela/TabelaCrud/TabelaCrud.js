import React from 'react';
import ItemCrud from './ItemCrud/ItemCrud';

const PaginaTabela = () => {


  return (
    <div className="row">
      <div className="d-flex flex-row-reverse px-2 pb-2">
        <button className="btn btn-success m-1 d-flex align-items-center">
          <i className="fas fa-plus"></i>
          <span className="ps-2">Adicionar Registro</span>
        </button> 
        <button className="btn btn-warning m-1 d-flex align-items-center">
          <i className="fas fa-calculator"></i>
          <span className="ps-2">Gerar Extrato Mensal</span>
        </button> 
      </div>

      <div className="col-0">
        <table className="table table-striped">
          <thead className="bg-success text-white">
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">CPF</th>
              <th scope="col">Valor</th>
              <th scope="col">Data</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            <ItemCrud/>
            <ItemCrud/>
            <ItemCrud/>
            <ItemCrud/>
            <ItemCrud/>
            <ItemCrud/>
            <ItemCrud/>
            <ItemCrud/>
            <ItemCrud/>
          </tbody>
        </table>
      </div>

      
    </div>
  );



}

export default PaginaTabela;