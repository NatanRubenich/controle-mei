import React, { useState, useEffect } from 'react';
import { useLogin } from '../../Context/LoginContext';
import axios from '../../axios/axios';
import { Link } from 'react-router-dom';

import Dropdown from 'react-bootstrap/Dropdown';

const BotaoGerarExtrato = () => {
  const { logado, setLogado } = useLogin();
  const [ meses, setMeses ] = useState([]);

  const requisitarMeses = async () => {
    if(logado) {
      axios({
        method: 'get',
        url: '/verificar-extrato',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        console.log(response);
        setMeses(response.data.mesesDisponiveis);
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      console.log('Erro ao buscar meses');
    }
  }

  useEffect( () => {
    requisitarMeses();
  }, [logado]);

  const elementosMeses = () => {
    if(!logado) return null;

    const elementos = meses.map((e) => {
      const dataMes = e.substring(3);
      const url = dataMes.replace('/', '-');
      return <Link to={`/extrato/${url}`}><button key={e} className="dropdown-item text-center">{dataMes}</button></Link>;
    });

    return elementos;
  }

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="warning" id="dropdown-basic">
          Gerar Extrato Mensal
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {elementosMeses()}
        </Dropdown.Menu>
      </Dropdown>
    </>
  )


}
/* 
        <button className="btn btn-warning mx-auto py-3 px-4 fs-5 d-flex justify-content-center align-items-center">
          <i className="fas fa-calculator"></i>
          <span className="ps-2">Gerar Extrato Mensal</span>
        </button> 
  */


export default BotaoGerarExtrato;
