import React, { useState, useEffect } from 'react';
import axios from '../../../axios/axios';

import GraficoPizza from './GraficoPizza/GraficoPizza';
import Card from './Card/Card';
import BotaoGerarExtrato from '../../BotaoGerarExtrato/BotaoGerarExtrato';

const Dashboard = () => {

  const [tabAtiva, setTabAtiva] = useState("mes");

  const [dados, setdados] = useState({});
  

  const getDashboard = async () => {
    if(localStorage.getItem("token")) {
      await axios({
        method: 'get',
        url: `/dashboard/${tabAtiva}`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res) => {
        setdados(res);
      })
      .catch(err => {
        console.log(err);
        console.log('Erro ao buscar dados do dashboard', err);
      });
    } else {
      console.log('Não possui autorização');
    }
  }

  useEffect(() => {
    getDashboard();
  }, [tabAtiva]);
  

  const handleBotaoData = (data) => {
    setTabAtiva(data);
    setdados({});
  }


  return (
    <div className="row m-0 px-2 p-md-5 min-vh-100 bg-light" id="dashboard">
      <div className="col-0 col-md-8 py-4 text-center text-md-start display-3">
        Dashboard
      </div>
      <div className="col-4 d-none d-md-flex align-items-center ">
        <BotaoGerarExtrato/>
      </div>

      <div className="col-0 col-lg-8 p-0">

        <div className="row m-0 p-0">
            <div className="col-0">
              <button className={`btn btn-outline-primary m-1 ${tabAtiva === "mes" && "bg-primary text-white"}`} onClick={() => handleBotaoData("mes")} >Mês</button>
              <button className={`btn btn-outline-primary m-1 ${tabAtiva === "ano" && "bg-primary text-white"}`} onClick={() => handleBotaoData("ano")} >Ano</button>
            </div>
              <Card titulo="Vendas" icone="chart-line" dado={dados.data && dados.data.vendas}/>
              <Card titulo="Clientes" icone="users" dado={dados.data && dados.data.clientesUnicos}/>
              <Card titulo="Rendimento" icone="calendar-alt" dado={dados.data && dados.data.rendimento && dados.data.rendimento.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })}/>
              <Card titulo="Média de cada venda" icone="dollar-sign" dado={dados.data && dados.data.rendimento && dados.data.media.toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' })}/>
        </div>
      </div>
      <div className="col-11 col-md-8 col-lg-4 p-0 p-md-2 mx-auto shadow">


          <div className="container bg-light rounded py-3 text-center">
            <span className="fs-5 text-primary">Tipos de Venda</span>
            <div className="card-body px-0">
              { dados.data && tabAtiva === "mes" && <GraficoPizza dado={dados.data.tipoVenda}/> }
              { dados.data && tabAtiva === "ano" && <GraficoPizza dado={dados.data.tipoVenda}/> }
            </div>
          </div>

      </div>
      
      <div className="d-flex d-md-none col-10 mx-auto my-5 p-0">
        <button className="btn btn-warning mx-auto py-3 px-4 fs-5 d-flex justify-content-center align-items-center">
          <i className="fas fa-calculator"></i>
          <span className="ps-2">Gerar Extrato Mensal</span>
        </button> 
      </div>
    </div>
  );

}

export default Dashboard;