import express from 'express';
import { 
  cadastroController, 
  loginController,
  authController
} from '../controllers/controllerAuth.js';

import { 
  getTabelaController,
  getDashboardMes,
  getDashboardAno,
  postTabelaController,
  deleteTabelaController,
  editarTabelaController
} from '../controllers/controllerTabela.js';

import {
  getExtratosDisponiveis,
  getExtratoMensal
} from '../controllers/controllerExtrato.js';

import { authMiddleware } from '../middlewares/middlewares.js';

const router = express.Router();


////////////////////////////
/////     AUTH      ////////

// Rotas de cadastro
router.post('/cadastro/enviar', async (req, res) => {
  cadastroController(req, res);
});

// Login
router.post('/login/enviar', async (req, res) => {
  loginController(req, res);
});


////////////////////////////
/////     CRUD      ////////
// Listando registros
router.get('/registros/lista/:pagina', async (req, res, next) => {
  authMiddleware(req, res, next);
});

router.get('/registros/lista/:pagina', async (req, res) => {
  getTabelaController(req, res);
});

// Criando registro
router.post('/registros/novo/enviar', async (req, res, next) => {
  authMiddleware(req, res, next);
});

router.post('/registros/novo/enviar', async (req, res) => {
  postTabelaController(req, res);
});


// Removendo registro
router.delete('/registros/deletar', async (req, res, next) => {
  authMiddleware(req, res, next);
});

router.delete('/registros/deletar', async (req, res) => {
  deleteTabelaController(req, res);
});

// Editando registro
router.put('/registros/editar/enviar', async (req, res, next) => {
  authMiddleware(req, res, next);
});

router.put('/registros/editar/enviar', async (req, res) => {
  editarTabelaController(req, res);
});



//// DASHBOARD

// Dashboard MÊS
router.get('/dashboard/mes', async (req, res, next) => {
  authMiddleware(req, res, next);
});

router.get('/dashboard/mes', async (req, res) => {
  getDashboardMes(req, res);
});


// Dashboard ANO
router.get('/dashboard/ano', async (req, res, next) => {
  authMiddleware(req, res, next);
});

router.get('/dashboard/ano', async (req, res) => {
  getDashboardAno(req, res);
});


//// EXTRATOS

// Gerando Meses Disponíveis para Extratos
router.get('/verificar-extrato', async (req, res, next) => {
  authMiddleware(req, res, next);
});

router.get('/verificar-extrato', async (req, res) => {
  getExtratosDisponiveis(req, res); 
});


// Gerando extrato mensal
router.get('/extrato/:mes', async (req, res, next) => {
  authMiddleware(req, res, next);
});

router.get('/extrato/:mes', async (req, res) => {
  getExtratoMensal(req, res); 
});



// Verificando auth 
router.get('/auth', async (req, res, next) => {
  await authMiddleware(req, res, next);
});

router.get('/auth', async (req, res, next) => {
  authController(req, res);
});





export default router;