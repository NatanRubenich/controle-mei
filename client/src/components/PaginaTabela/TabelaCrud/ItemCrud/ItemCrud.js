import React, { useState } from 'react';
import ModalEscolha from '../../../ModelEscolha/ModelEscolha';
import { useDadosEditar } from '../../../../Context/DadosEditar';
import { useHistory } from 'react-router-dom';


const ItemCrud = ({ dados, deletar }) => {

  // Mostrar detalhes
  const [ detalhes, setDetalhes ] = useState(false);

  // Hook - dados para editar
  const { dadosEditar, setDadosEditar } = useDadosEditar();

  // Redirecionador
  const historico = useHistory();

  const handleEditarDados = () => {
    setDadosEditar(dados);
    historico.push('/registros/editar');
  }


  /// FORMATAÇÃO DE DADOS
  const data = new Date(dados.dataVenda).toLocaleString('pt-BR').split(' ');

  const formatarTipoVenda = () => {
    let resposta = dados.tipoVenda;
    switch (resposta) {
      case 'servico':
        resposta = 'Serviço';
        break;

      case 'produto':
        resposta = 'Produto Industrializado';
        break;
        
      case 'revenda':
        resposta = 'Revenda de Mercadoria';
        break;
    
      default: resposta = ""; 
        break;
    }
    return resposta;
  }

  const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  return (
    <div 
      className="row border border-secondary secFont fw-light fs-6 border-2 rounded px-0 px-md-5 py-md-2 my-1 selecionavel itemCrud"
      onClick={() => setDetalhes(!detalhes)}
    >
      <div className="container m-0 m-md-2">
        <div className="row my-auto d-none d-md-flex">
          <div className="col my-auto">
            <span className="display fs-5 text-uppercase">{dados.nomeCliente}</span>
          </div>
          <div className="col-3 my-auto mx-lg-2">
            <label className="fw-normal">Data: &nbsp;</label>
            <span>{data[0]}</span>
          </div>
          <div className="col-3 my-auto mx-lg-2">
            <label className="fw-normal">Valor Final: &nbsp;</label>
            <span>{formatarMoeda(dados.valorFinal)}</span>
          </div>
        </div>

        <div className="row my-auto d-flex d-md-none">
          <div className="col-8 my-auto ps-3">
            <span className="display fs-5 text-uppercase">{dados.nomeCliente}</span>
          </div>

          <div className="col-4 my-auto">
            <div className="row">
              <div className="col-6 my-auto">
                <span>{data[0]}</span>
              </div>
            </div>

            <div className="row">
              <div className="col-6 my-auto">
                <span>{formatarMoeda(dados.valorFinal)}</span>
              </div>
            </div>
          </div>
          
        </div>

        <div className={`row mt-3 ${detalhes ? 'd-flex' : 'd-none'}`}>
          <div className="col-9">
            <div className="row">

              <div className="col-0 col-md-4">
                <label className="fw-normal">Tipo da Venda: &nbsp;</label>
                <span>{formatarTipoVenda()}</span>
              </div>
              <div className="col-0 col-md-4">
                <label className="fw-normal">Desconto: &nbsp;</label>
                <span>{dados.desconto}%</span>
              </div>
              <div className="col-0 col-md-4">
                <label className="fw-normal">Quantidade: &nbsp;</label>
                <span>{dados.quantidade}</span>
              </div>
              <div className="col-0 col-md-4">
                <label className="fw-normal">Valor Unitário: &nbsp;</label>
                <span>{formatarMoeda(dados.valorUnitario)}</span>
              </div>
              <div className="col-0 col-md-4">
                <label className="fw-normal">Nota Fiscal: &nbsp;</label>
                <span>{dados.notaFiscal ? "Sim" : "Não"}</span>
              </div>

              <div className="col-0 col-md-8">
                <label className="fw-normal">Descrição: &nbsp;</label>
                <span>{dados.descricao}</span>
              </div>


            </div>
          </div>
          

          <div className="col flex-row no-wrap justify-content-end"> 
            <div className="d-flex justify-content-end">
              <button className="btn btn-success m-1" onClick={handleEditarDados}><i className="fas fa-pencil-alt"></i></button> 
              <ModalEscolha titulo="Deseja realmente excluir?" callback={() => deletar(dados._id)} />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default ItemCrud;