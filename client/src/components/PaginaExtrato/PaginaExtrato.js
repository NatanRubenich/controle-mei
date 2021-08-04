import React, { useState, useEffect } from 'react';
import { useLogin } from '../../Context/LoginContext';
import { useLocation } from "react-router-dom";
import axios from '../../axios/axios';


import WrapperTabela from '../PaginaTabela/WrapperTabela/WrapperTabela';


const PaginaExtrato = () => {
  const { logado, setLogado } = useLogin();
  const location = useLocation();
  const [dadosTabela, setDadosTabela] = useState({});

  const requisitarMeses = async () => {
    if(logado) {
      axios({
        method: 'get',
        url: location.pathname,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        console.log('resposta', response);
        setDadosTabela(response.data.resultado);
        console.log('local', location);
       
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

  const moeda = (dado) => {
    return dado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }


  return (
    <div className="row m-0">
        <WrapperTabela>
          <div className="z-index2">
            <h2 className="text-center mt-3">{dadosTabela.periodo ? dadosTabela.periodo.padStart(7, '0') : null}</h2>
          </div>
          <div className="col-12 col-md-10 mx-auto mt-2 mb-5 p-2 bg-light rounded d-flex justify-content-center shadow-lg z-index2 position-relative">
            <div className="row g-0 borderblack fontTNR">
              <div className="row g-0">
                <h5 className="text-center borderblack m-0 p-2">RELATÓRIO MENSAL DAS RECEITAS BRUTAS</h5>

                <div className="col-0 borderblack p-1">
                  <span>CNPJ: </span>
                  <span>{dadosTabela.cnpj ? dadosTabela.cnpj : null}</span>
                </div>
                <div className="col-0 borderblack p-1">
                  <span>Empreendedor Individual: </span>
                  <span>{dadosTabela.empreendedor ? dadosTabela.empreendedor : null}</span>
                </div>
                <div className="col-0 borderblack p-1">
                  <span>Período de Apuração: </span>
                  <span>{dadosTabela.periodo ? dadosTabela.periodo.padStart(7, '0') : null}</span>
                </div>
              </div>

              <div className="row g-0">
                <h5 className="borderblack m-0 p-2">RECEITA BRUTA MENSAL - REVENDA DE MERCADORIAS (COMÉRCIO)</h5>

                <div className="col-9 borderblack p-1">
                  <span>I - Revenda de mercadorias com dispensa de emissão de documento fiscal </span>
                </div>
                <div className="col-3 borderblack p-1">
                  <span>{dadosTabela.revenda ? moeda(dadosTabela.revenda.semNota) : null}</span>
                </div>
                <div className="col-9 borderblack p-1">
                  <span>II - Revenda de mercadorias com documento fiscal emitido </span>
                </div>
                <div className="col-3 borderblack p-1">
                  <span>{dadosTabela.revenda ? moeda(dadosTabela.revenda.nota) : null}</span>
                </div>
                <div className="col-9 borderblack p-1">
                  <span>III - Total das receitas com revenda de mercadorias (I + II) </span>
                </div>
                <div className="col-3 borderblack p-1">
                  <span>{dadosTabela.revenda ? moeda(dadosTabela.revenda.total) : null}</span>
                </div>
              </div>

              <div className="row g-0">
                <h5 className="borderblack m-0 p-2">RECEITA BRUTA MENSAL - REVENDA DE PRODUTOS INDUSTRIALIZADOS (INDÚSTRIA)</h5>

                <div className="col-9 borderblack p-1">
                  <span>IV - Venda de produtos industrializados com dispensa de emissão de documento fiscal </span>
                </div>
                <div className="col-3 borderblack p-1">
                  <span>{dadosTabela.produto ? moeda(dadosTabela.produto.semNota) : null}</span>
                </div>
                <div className="col-9 borderblack p-1">
                  <span>V - Venda de produtos industrializados com documento fiscal emitido </span>
                </div>
                <div className="col-3 borderblack p-1">
                  <span>{dadosTabela.produto ? moeda(dadosTabela.produto.nota) : null}</span>
                </div>
                <div className="col-9 borderblack p-1">
                  <span>VI - Total das receitas com venda de produtos industrializados (IV + V) </span>
                </div>
                <div className="col-3 borderblack p-1">
                  <span>{dadosTabela.produto ? moeda(dadosTabela.produto.total) : null}</span>
                </div>
              </div>

              <div className="row g-0">
                <h5 className="borderblack m-0 p-2">RECEITA BRUTA MENSAL - PRESTAÇÃO DE SERVIÇOS</h5>

                <div className="col-9 borderblack p-1">
                  <span>VII - Receita com prestação de serviços com dispensa de emissão de documento fiscal </span>
                </div>
                <div className="col-3 borderblack p-1">
                  <span>{dadosTabela.servico ? moeda(dadosTabela.servico.semNota) : null}</span>
                </div>
                <div className="col-9 borderblack p-1">
                  <span>VIII - Receita com prestação de serviços com documento fiscal emitido </span>
                </div>
                <div className="col-3 borderblack p-1">
                  <span>{dadosTabela.servico ? moeda(dadosTabela.servico.nota) : null}</span>
                </div>
                <div className="col-9 borderblack p-1">
                  <span>IX - Total das receitas prestação de serviços (VII + VIII) </span>
                </div>
                <div className="col-3 borderblack p-1">
                  <span>{dadosTabela.servico ? moeda(dadosTabela.servico.total) : null}</span>
                </div>

                <div className="col-9 borderblack p-1">
                  <span>IX - Total das receitas brutas no mês (III + VI + IX) </span>
                </div>
                <div className="col-3 borderblack p-1">
                  <span>
                    {
                      dadosTabela.servico 
                      ? moeda(dadosTabela.revenda.total + dadosTabela.produto.total + dadosTabela.servico.total ) 
                      : null
                    }
                  </span>
                </div>
              </div>

              <div className="row g-0">
                <div className="col-5 d-flex flex-column borderblack p-1">
                  <span>LOCAL E DATA:</span>
                  <span className="mb-3 mt-1 text-center">{dadosTabela.cidadeEData ? dadosTabela.cidadeEData : null}</span>
                </div>
                <div className="col-7 d-flex flex-column borderblack p-1">
                  <span>ASSINATURA DO EMPRESÁRIO:</span>
                </div>
              </div>

              <div className="row g-0">
                <div className="col-0 d-flex flex-column borderblack p-1 font-small">
                  <span>ENCONTRAM-SE ANEXADOS A ESTE RELATÓRIO:</span>
                  <span>- Os documentos fiscais comprobatórios das entradas de mercadorias e serviços tomados referentes ao período;</span>
                  <span>- As notas fiscais relativas às operações ou prestações realizadas eventualmente emitidas.</span>
                </div>
              </div>
            </div>
          </div>
        </WrapperTabela>
    </div>
  );
}



export default PaginaExtrato;