import React from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../axios/axios';

import ItemCrud from './ItemCrud/ItemCrud';

const PaginaTabela = () => {

  const requisitarRegistros = async () => {
    if(localStorage.getItem("token")) {
      await axios({
        method: 'get',
        url: '/registros',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      console.log('não tem token');
    }
  }

  requisitarRegistros();


  return (

  <div className="col-11 col-md-10 mx-auto m-5 bg-light rounded justify-content-center align-items-center shadow-lg z-index2">
    <div className="container">
      <h4 className="text-center mt-4 mb-4 titulo text-uppercase">Registros</h4>
      <div className="container p-0">
        <div className="row">
          <div className="d-flex flex-row-reverse px-2 pb-2">
            <Link to="/registros/novo">
              <button className="btn btn-success m-1 d-flex align-items-center">
                <i className="fas fa-plus"></i>
                <span className="ps-2 text-white">Adicionar Registro</span>
              </button>
            </Link> 
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
      </div>
    </div>
  </div>
  );



}

export default PaginaTabela;