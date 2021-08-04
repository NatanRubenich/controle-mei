import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from '../../../axios/axios';

import BotaoGerarExtrato from '../../BotaoGerarExtrato/BotaoGerarExtrato';
import ItemCrud from './ItemCrud/ItemCrud';


const PaginaTabela = () => {

  const [ dadosTabela, setDadosTabela ] = useState([]);
  const [ renderizar, setRenderizar ] = useState(false);

  // Localização url e histórico
  const parametros = useParams();
  const historico = useHistory();


  // Redirecionando URL
  const verificarNumPagina = () => {
    const num = parseInt(parametros.page)
    if(num < 0) {
      historico.push('/registros/lista/0');
    }
    return num;
  }
  const numPagina = verificarNumPagina();
 


  // Requisição AXIOS GET
  const requisitarRegistros = async () => {
    if(localStorage.getItem("token") && numPagina >= 0) {
      await axios({
        method: 'get',
        url: `/registros/lista/${numPagina}`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(resposta => {
        console.log('RENDERIZEI', resposta);
        setDadosTabela(resposta.data.query)
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      console.log('Erro ao requisitar registros');
    }
  }



  // Use Effect
  useEffect(() => {
    requisitarRegistros();
  }, [renderizar]);
  

  // Produz os elementos JSX 
  const gerarTabela = () => {
    let elementoReturn = null;

    if(dadosTabela) {
      elementoReturn = dadosTabela.map((e) => {
        return <ItemCrud key={e._id} dados={e} deletar={(id) => handleDeletar(id)} />;
      });
    }
    return elementoReturn;
  }


  // Handle deletar items
  const handleDeletar = async (id) => {
    if(localStorage.getItem("token")) {
      await axios({
        method: 'delete',
        data: {id},
        url: '/registros/deletar',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res) => {
        console.log('resposta', res);
        setRenderizar(!renderizar);
      })
      .catch(err => {
        console.log(err);
        console.log('erro AQUI', err);
      });
      console.log('fiz a req');
    } else {
      console.log('Erro ao requisitar registros');
    }
  }



    // Seta Direita
    const setaDireita = () => {
      if(dadosTabela[10]) {
        return (
          <Link to={'/registros/lista/' + (numPagina + 1)}>
            <div className="mx-3">
              <i className="fas fa-arrow-right" onClick={() => setRenderizar(!renderizar)}></i>
            </div>
          </Link>
        )
      } else {
        return (
          <div className="mx-3">
            <i className="fas fa-arrow-right text-secondary" onClick={() => setRenderizar(!renderizar)}></i>
          </div>
        )
      }
  
    }
   
    // Seta Esquerda
    const setaEsquerda = () => {
      if(numPagina > 0) {
        return (
          <Link to={'/registros/lista/' + (numPagina - 1)}>
            <div className="mx-3">
              <i className="fas fa-arrow-left" onClick={() => setRenderizar(!renderizar)}></i>
            </div>
          </Link>
        )
      } else {
        return (
          <div className="mx-3">
            <i className="fas fa-arrow-left text-secondary" onClick={() => setRenderizar(!renderizar)}></i>
          </div>
        )
      }
    }

  return (
  <div className="col-12 col-md-10 mx-auto m-5 p-2 bg-light rounded justify-content-center align-items-center shadow-lg z-index2 position-relative">
      <h4 className="text-center mt-4 mb-4 titulo text-uppercase">Registros</h4>
      <div className="container p-0">
        <div className="d-flex flex-column p-0">
          <div className="d-flex flex-row-reverse mx-2 me-lg-5">
            <Link to="/registros/novo">
              <button className="btn btn-success mx-1 d-flex align-items-center">
                <i className="fas fa-plus"></i>
                <span className="ps-2 text-white">Adicionar Registro</span>
              </button>
            </Link> 
            <BotaoGerarExtrato /> 
          </div>

          <div className="col-11 mx-auto">
            {gerarTabela()}
          </div>
        </div>
      </div>
    <div className="">
      <div className="d-flex flex-row justify-content-center display-5 mt-5 mb-3 position-relative">
          { setaEsquerda() }
          { setaDireita() }
      </div>
    </div>

  </div>
  );
}

export default PaginaTabela;