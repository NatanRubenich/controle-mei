import React from 'react';

const PaginaLogin = () => {

  return (
    <div className="row bg-secondary min-vh-100 m-0">
      <div className="d-flex justify-content-center align-items-center">
        <div className="card p-3">
          <div className="card-body card-login">
            <h4 className="card-title mb-5">Login</h4>
            
            <form>
              <div className="mb-3">
                <label for="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" aria-describedby="email"/>
              </div>
              <div className="mb-3">
                <div className="row">
                  <div className="col">
                    <label for="senha" className="form-label d-flex">Senha</label>
                  </div>
                  <div className="col">
                    <a href="recuperar_senha.html">
                      Esqueceu a senha?
                    </a>
                  </div>
                </div>
                
                <input type="password" className="form-control" id="senha"/>


              </div>
              <div className="row mt-4">
                <button className="btn btn-primary btn-block py-3">Login</button>

              </div>


								<div class="mt-4 text-center">
									Não tem uma conta? <a href="registro.html">Cadastre-se</a>
								</div>

            </form>






          </div>
        </div>
      </div>
    </div>
  );

}



export default PaginaLogin;