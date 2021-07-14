import React from 'react';

const FormCadastro = () => {

  return (            
    <form class="row g-3">
      <div class="col-md-6">
        <label for="nome" class="form-label">Primeiro Nome</label>
        <input type="text" class="form-control" id="nome"/>
      </div>

      <div class="col-md-6">
        <label for="sobrenome" class="form-label">Sobrenome</label>
        <input type="text" class="form-control" id="sobrenome"/>
      </div>

      <div class="col-md-7">
        <label for="nome-empresa" class="form-label">Nome da Empresa</label>
        <input type="text" class="form-control" id="nome-empresa"/>
      </div>

      <div class="col-md-5">
        <label for="cnpj" class="form-label">CNPJ</label>
        <input type="text" class="form-control" id="cnpj"/>
      </div>

      <div class="col-0 col-md-7">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email"/>
      </div>
      <div class="col-0 col-md-5">
        <label for="telefone" class="form-label">Telefone</label>
        <input type="text" class="form-control" id="telefone"/>
      </div>
      <div class="col-0 col-md-6">
        <label for="senha" class="form-label">Senha</label>
        <input type="password" class="form-control" id="senha"/>
      </div>
      <div class="col-0 col-md-6">
        <label for="senha2" class="form-label">Confirme a Senha</label>
        <input type="password" class="form-control" id="senha2"/>
      </div>
      
      <div class="col-0 p-4">
        <div className="row">
          <button className="btn btn-primary btn-block py-3">Cadastrar</button>
        </div>
      </div>

    </form>

  );

}



export default FormCadastro;