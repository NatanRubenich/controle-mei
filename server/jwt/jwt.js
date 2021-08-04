import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// ENV
const dotenvResultado = dotenv.config();
if (dotenvResultado.error) {
  throw dotenvResultado.error;
}

export const loginJWT = async (idUsuario) => {
  const token = jwt.sign({ userId: idUsuario }, process.env.SECRET_JWT, {
    expiresIn: 86400
  });
  return token;
}

export const verificarJWT = async (token) => {
  const resultado = jwt.verify( token, process.env.SECRET_JWT);
  return resultado;
}