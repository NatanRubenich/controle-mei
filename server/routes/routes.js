import express from 'express';
import { 
  cadastroController, 
  loginController
} from '../controllers/controllerAuth.js';

import { 
  getTabelaController
} from '../controllers/controllerTabela.js';

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

// Verificando se está logado
router.get('/auth', async (req, res, next) => {
  authMiddleware(req, res, next);
});



////////////////////////////
/////     CRUD      ////////

// Listando registros
router.get('/registros', async (req, res, next) => {
  authMiddleware(req, res, next);
});

router.get('/registros', async (req, res, next) => {
  getTabelaController(req, res);
});



// Criando registro
router.post('/registros/novo/enviar', async (req, res, next) => {
  authMiddleware(req, res, next);
  getTabelaController(req, res);
});









export default router;