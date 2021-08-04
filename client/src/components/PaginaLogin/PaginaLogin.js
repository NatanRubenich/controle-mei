import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios/axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { usuarioSchema } from '../Validations/ValidacaoLogin';
import { useLogin } from "../../Context/LoginContext";

import ModalSucesso from '../ModalSucesso/ModalSucesso';


const PaginaLogin = () => {
  const [ errosLogin, setErrosLogin ] = useState([]);
  const [ sucesso, setSucesso ] = useState(false);

  // Hook para definir o usuário atual globalmente 
  const { logado, setLogado } = useLogin();

  // React hook form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(usuarioSchema)
  });

  // Dados pós validação do YUP 
  const handleDadosValidados = (form) => {
    requisicaoLogin(form);
  }

  // Request
  const requisicaoLogin = (form) => {
    setErrosLogin([]);
    axios({
      method: 'post',
      url: '/login/enviar',
      data: form
    })
    .then((res) => {
      if(res.data.usuario && res.data.token) {
        setSucesso(true);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("usuario", res.data.usuario.nome);
        setLogado(true);
      }
      if(res.data.erro) {
        setErrosLogin(res.data.erro);
      }
    })
    .catch((err) => {
      console.log(err)
    }); 
  }



  return (
    <div className="row bg-secondary min-vh-100 m-0 login-imagem position-relative">
      <div className="blind"></div>
      <div className="d-flex justify-content-center align-items-center z-index2">
        <div className="card p-3 shadow-lg">
          <div className="card-body card-login">
            <h4 className="card-title mb-5">Login</h4>
            
            <form onSubmit={handleSubmit((e) => handleDadosValidados(e))}>
              <div className="mb-3">
                <label for="email" className="form-label">Email</label>
                <input type="text" id="name" className="form-control" id="email" {...register("email")}/>
                <span className="text-danger">{errors.email && `${errors.email.message}`}</span>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <label for="senha" className="form-label d-flex">Senha</label>
                  </div>
                  <div className="col">
                    <a href="#">
                      Esqueceu a senha?
                    </a>
                  </div>
                </div>
                <input type="password" name="senha" className="form-control" id="senha" {...register("senha")}/>
                <span className="text-danger">{errors.senha && `${errors.senha.message}`}</span>
              </div>
              <div className="row">
                <span className="text-danger my-2">{errosLogin}</span>
                <button className="btn btn-primary btn-block py-3">Login</button>
              </div>
								<div class="mt-4 text-center">
									Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
								</div>
            </form>
          </div>
          {sucesso? <ModalSucesso   
            titulo="Login realizado com sucesso!" 
            texto="Redirecionando para a página inicial..."
            url="/"
            /> : null }
        </div>
      </div>
    </div>
  );

}



export default PaginaLogin;