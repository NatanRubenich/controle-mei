import React, {useState} from 'react';
import axios from '../../../axios/axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { addRegistroSchema } from '../../Validations/ValidacaoAddRegistro';
import { useDadosEditar } from '../../../Context/DadosEditar';
import { useHistory } from 'react-router-dom';

import ModalSucesso from '../../ModalSucesso/ModalSucesso';




const EditarRegistro = () => {

  // React hook form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(addRegistroSchema)
  });

  // Hook - dados para editar
  const { dadosEditar, setDadosEditar } = useDadosEditar();

  // Redirecionador
  const historico = useHistory();
  if(Object.getOwnPropertyNames(dadosEditar).length === 0) {
    historico.push('/registros');
  }
  

  const formatarData = (data) => {
    const d = new Date(data);
    function pad (n){
      return n<10 ? '0'+n : n
    }
    return d.getFullYear()+'-'
         + pad(d.getMonth()+1)+'-'
         + pad(d.getDate());
  }

  // Sucesso 
  const [ sucesso, setSucesso ] = useState(false);
  

  // Lógica - valor total, desconto...
  const calcularValorFinal = (dadosForm) => {

    const valorTotal = dadosForm.quantidade * dadosForm.valorUnitario;
    const valorComDesconto = valorTotal * ( 1 - (dadosForm.desconto / 100));
    const valorFinal = valorComDesconto;
    const formComValorFinal = {...dadosForm, valorFinal };
    console.log(dadosForm.quantidade, dadosForm.valorUnitario, 'valor total', valorTotal, 'valorComDesconto', valorComDesconto, 'valorFinal', valorFinal)
    
    return formComValorFinal
  }

  // Dados após validação
  // Enviando ao server
  const handleDadosValidados = async (dados) => {
    const formFinal = calcularValorFinal(dados);
    if(localStorage.getItem("token")) {
      await axios({
        method: 'put',
        url: 'registros/editar/enviar',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        data: {
          form: formFinal,
          id: dadosEditar._id
        }
      })
      .then(response => {
        setSucesso(true);
        document.getElementById("formEditar").reset();
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      console.log('Erro ao criar um novo registro');
    }
  }
 

  // JSX
  return (
    <div className="col-11 col-md-10 col-lg-6 mx-auto m-5 bg-light rounded justify-content-center align-items-center position-relative shadow-lg z-index2">
      <div className="container p-0 p-md-4">
        <h4 className="text-center mt-4 mb-4 titulo">Editar Registro</h4>
        <div className="container p-0">
          <div className="row">
            <div className="col-0">

            <form className="row g-3" id="formEditar" onSubmit={handleSubmit((e) => handleDadosValidados(e))}>

            <div className="col-md-8">
              <label htmlFor="nomeCliente" class="form-label mt-2">Nome do Cliente</label>
              <input 
                type="text" 
                name="nomeCliente"
                className="form-control" 
                id="nomeCliente"
                defaultValue={dadosEditar.nomeCliente}
                {...register("nomeCliente")}
              />
              <span className="text-danger">{errors.nomeCliente && `${errors.nomeCliente.message}`}</span>
            </div>


            <div className="col-6 col-md-4">
              <label htmlFor="tipoVenda" className="form-label mt-2">Tipo de Venda</label>
              <select 
                className="form-select"
                name="tipoVenda"
                className="form-control" 
                id="tipoVenda"
                defaultValue={dadosEditar.tipoVenda}
                {...register("tipoVenda")}
              >
                <option value="produto" defaultValue>Produto</option>
                <option value="servico">Serviço</option>
                <option value="revenda">Revenda de Mercadoria</option>
              </select>
              <span className="text-danger">{errors.tipoVenda && `${errors.tipoVenda.message}`}</span>
            </div>


            <div className="col-6 col-md-4">
              <label htmlFor="dataVenda" class="form-label mt-2">Data da Venda</label>
              <input 
                type="date" 
                name="dataVenda"
                className="form-control" 
                id="dataVenda"
                defaultValue={formatarData(dadosEditar.dataVenda)}
                {...register("dataVenda")}
              />
              <span className="text-danger">{errors.dataVenda && `${errors.dataVenda.message}`}</span>
            </div>


            <div className="col-6 col-md-4">
              <label htmlFor="quantidade" class="form-label mt-2">Quantidade</label>
              <input 
                type="text" 
                name="quantidade"
                className="form-control" 
                id="quantidade"
                defaultValue={dadosEditar.quantidade}
                {...register("quantidade")}
              />
              <span className="text-danger">{errors.quantidade && `${errors.quantidade.message}`}</span>
            </div>

            <div className="col-6 col-md-4">
              <label htmlFor="valorUnitario" class="form-label mt-2">Valor Unitário</label>
              <input 
                type="text" 
                name="valorUnitario"
                className="form-control" 
                id="valorUnitario"
                defaultValue={dadosEditar.valorUnitario}
                {...register("valorUnitario")}
              />
              <span className="text-danger">{errors.valorUnitario && `${errors.valorUnitario.message}`}</span>
            </div>

            <div className="col-md-0">
              <label htmlFor="descricao" class="form-label mt-2">Descrição</label>
              <textarea
                type="text" 
                name="descricao"
                className="form-control" 
                id="descricao"
                defaultValue={dadosEditar.descricao}
                {...register("descricao")}
              />
              <span className="text-danger">{errors.descricao && `${errors.descricao.message}`}</span>
            </div>


            <div className="col-6 col-md-3">
              <label htmlFor="desconto" class="form-label mt-2">Desconto</label>
              <div class="input-group mb-2">
                <input 
                  type="text" 
                  name="desconto"
                  className="form-control" 
                  id="desconto"
                  defaultValue={dadosEditar.desconto}
                  {...register("desconto")}
                />
                <span className="input-group-text">%</span>
              </div>
              <span className="text-danger">{errors.desconto && `${errors.desconto.message}`}</span>
            </div>


            <div className="col-6 col-md-4 ms-md-5">
            <label htmlFor="radioNotaFiscal" className="form-label mt-2">Nota Fiscal emitida?</label>
            <div className="form-check" name="radioNotaFiscal">
              <input className="form-check-input" type="radio" name="notaFiscal" id="notaFiscal1" value="true" {...register("notaFiscal")} defaultChecked/>
              <label className="form-check-label" for="notaFiscal1">
                Sim
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="notaFiscal" id="notaFiscal2" value="false" {...register("notaFiscal")}/>
              <label className="form-check-label" for="notaFiscal2">
                Não
              </label>
            </div>
            </div>
              <div className="col-0 p-4">
                <div className="row">
                  <button className="btn btn-primary btn-block py-3">Enviar</button>
                </div>
              </div>
            </form>
            </div>      
          </div>
        </div>
      </div>
      { sucesso ? <ModalSucesso 
        titulo="" 
        texto="Registro editado com sucesso!"
        url="/registros"
        callback={() => { setSucesso(false); setDadosEditar({});}}
        /> : null 
      }
    </div>
  );

}


export default EditarRegistro;