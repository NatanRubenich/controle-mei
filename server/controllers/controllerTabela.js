import Usuario from '../models/usuario.js';
import Tabela from '../models/tabela.js';


export const getTabelaController = (req, res) => {
  const resposta = res.locals.usuario;

  return res.send({maisds: resposta , mais: "SIM"});
};