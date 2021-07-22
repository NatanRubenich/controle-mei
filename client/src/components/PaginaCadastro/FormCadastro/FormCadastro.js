import React, { useState } from 'react';
import { useLogin } from "../../../Context/LoginContext";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from '../../../axios/axios';


import { usuarioSchema } from '../../Validations/ValidacaoCadastro';

import ModalSucesso from '../../ModalSucesso/ModalSucesso';

const elementos = [
  {nome: "nome", titulo: "Nome", tipo: "text", classe: "col-md-6", erro: "Insira um nome válido"},
  {nome: "sobrenome", titulo: "Sobrenome", tipo: "text", classe: "col-md-6", erro: "Insira um sobrenome válido"},
  {nome: "nomeEmpresa", titulo: "Nome da Empresa", tipo: "text", classe: "col-md-7", erro: "Insira um nome de empresa válido"},
  {nome: "cnpj", titulo: "CNPJ", tipo: "text", classe: "col-md-5", erro: "Insira um CNPJ válido"},
  {nome: "email", titulo: "Email", tipo: "text", classe: "col-md-7", erro: "Insira um email válido"},
  {nome: "telefone", titulo: "Telefone", tipo: "text", classe: "col-md-5", erro: "Insira um telefone válido"},
  {nome: "senha", titulo: "Senha", tipo: "password", classe: "col-md-6", erro: "Insira uma senha válida"},
  {nome: "senhaConf", titulo: "Confirme a Senha", tipo: "password", classe: "col-md-6", erro: "Senhas não correspondem"}
];


// HELPER - LIMPADOR DE SÍMBOLOS
const limparSimbolos = (form) => {
  const filtro = (valor) => {
    return valor.replace(/\D/g,'');
  }

  // Limpando símbolos
  const formFiltrado = {
    ...form, 
    telefone: filtro(form.telefone),
    cnpj: filtro(form.cnpj)
  }
  // Removendo a confirmação de senha
  delete formFiltrado.senhaConf;
  return formFiltrado;
}

const FormCadastro = () => {

  // Erros
  const [ errosCadastro, setErrosCadastro ] = useState([]);

  // Sucesso 
  const [ sucesso, setSucesso ] = useState(false);

  // Hook de login global
  const { logado, setLogado } = useLogin();

  // React hook form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(usuarioSchema)
  });


  // DADOS PÓS VALIDAÇÃO DO YUP
  const handleDadosValidados = (form) => {
    const formFiltrado = limparSimbolos(form);
    requisicaoPost(formFiltrado);
  }

  // POST REQUEST
  const requisicaoPost = (form) => {
    setErrosCadastro([]);
    axios({
      method: 'post',
      url: '/cadastro/enviar',
      data: form
    })
    .then((res) => {
      if(res.data.novoUsuario) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("usuario", res.data.novoUsuario.nome);
        setLogado(true);
        setSucesso(true);
      }
      if(res.data.erros) {
        console.log('ERROS', res.data.erros);
        setErrosCadastro(res.data.erros);
      }
    })
    .catch((err) => {
      console.log(err)
    }); 
  }

  // Gerar elementos JSX
  const gerarElementosInput = () => {
    const resultadoElementos = elementos.map((item) => {
      return (
        <div className={item.classe}>
          <label htmlFor={item.nome} class="form-label mt-2">{item.titulo}</label>
          <input 
            type={item.tipo} 
            className="form-control" 
            id={item.nome} 
            {...register(item.nome)}
          />
          <span className="text-danger">{errors[item.nome] && `${errors[item.nome].message}`}</span>
        </div>
      )
    });
    return resultadoElementos;
  }

  // JSX
  return (            
    <form class="row" onSubmit={handleSubmit((form) => handleDadosValidados(form))}>
      {gerarElementosInput()}
      <div class="col-0 p-4">
        <div className="row">
          { errosCadastro.map( e => <span className="text-danger">{e}</span>) }
          { sucesso ? <ModalSucesso titulo="Cadastro realizado com sucesso!"/> : null }
          <button className="btn btn-primary btn-block py-3 mt-2">Cadastrar</button>
        </div>
      </div>

    </form>

  );

}



export default FormCadastro;