import Usuario from '../models/usuario.js';
import { verificarJWT } from '../jwt/jwt.js'


//////////////////////////////////////////////////////////
//////////         AUTH MIDDLEWARE             //////////

export const authMiddleware = async (req, res, next) => {
  try {
    const tokenRaw = req.headers.authorization.toString().split(' ');
   
    try {
      if(tokenRaw.length === 2) {
        const token = tokenRaw[1];
  
        try {
          const resultado = await verificarJWT(token);
          
          try {
            const usuarioAtual = await Usuario.findById(resultado.userId);
            if(!usuarioAtual) {
              return res.send({ erro: "Usuário não existe" });
            }
    
            // Passando o User para a próxima função
            res.locals.usuario = usuarioAtual;
            next();
  
          } catch (error) {
            res.status(401);
          }
        } catch (error) {
          res.status(401).send({ erro: "Token inválido ou expirado" });
        }
  
      } else {
        res.send({ erro: "Token mal formatado" });
      }
  
    } catch (error) {
      res.send(error);
    }
  } catch (error) {
    res.status(401).send({ erro: "Sem Token", error});
  }
  
}