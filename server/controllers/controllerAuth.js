import express from 'express';
import Usuario from '../models/usuario.js';
import GrupoTabela from '../models/grupotabela.js';
import bcrypt from 'bcrypt';

import { loginJWT } from '../jwt/jwt.js'

//////////////////////////////////////////////////////////
//////////        LÓGICA DE CADASTRO           //////////
export const cadastroController = async (req, res) => {
  try {
    const { email, cnpj } = req.body;
    const erros = [];

    try {
      // Procurando informações preexistentes
      const resultadoEmail = async () => {
        if (await Usuario.findOne({ email })) {
          erros.push("Email já cadastrado");
          return true;
        }
      }
      const resultadoCNPJ = async () => {
        if (await Usuario.findOne({ cnpj })) {
          erros.push("CNPJ já cadastrado");
          return true;
        }
      }

      const checarExistentes = async () => {
        await resultadoEmail();
        await resultadoCNPJ();
        return erros.length > 0;
      }

    
      if(await checarExistentes()) {
        return res.send({ erros: erros });
      } else {
        // Enviando schema ao servidor
        const novoUsuario = new Usuario(req.body);
        const novoGrupoTabela = new GrupoTabela({ usuario: novoUsuario._id });
    
        // Adicionando a tabela no usuario
        await novoUsuario.set({ grupoTabela: novoGrupoTabela });
        
        // Salvando
        await novoUsuario.save();
        await novoGrupoTabela.save();

        // Removendo a senha do model
        novoUsuario.senha = undefined;

        // Gerando JWT 
        const token = await loginJWT(novoUsuario.id);
        console.log(novoUsuario, req.body);
        //Retornando o usuário + jwt
        return res.send({ novoUsuario, token });
      }

    } 
    catch(err) {
      res.send({ message: err.message });
    }

  }
  catch (err) {
    return res.status(400).send({ erro: "Registro falhou" });
  }
}


//////////////////////////////////////////////////////////
//////////          LÓGICA DE LOGIN            //////////
export const loginController = async (req, res) => {
  try {
    const { email, senha } = req.body;

    try {
      // Procurando informações preexistentes
      const usuario = await Usuario.findOne({ email }).select('+senha');
 
      // Verificando se a senha corresponde
      if (!await bcrypt.compare(senha, usuario.senha)) {
        return res.send({ erro: "Senha incorreta"});
      }

      // Limpando a senha do schema
      usuario.senha = undefined;

      // Gerando JWT 
      const token = await loginJWT(usuario.id);
      res.send({ usuario, token });


    } 
    catch(err) {
      res.send({ message: err.message });
    }

  }
  catch (err) {
    return res.status(400).send({ erro: "Registro falhou" });
  }
}

/// Retornar auth
export const authController = async (req, res) => {
  if(res.locals.usuario) {
    try {     
      const usuario = await Usuario.findById(res.locals.usuario._id);
      
      return res.status(200).send({usuario: usuario});

    } catch (error) {
      res.status(401).send("Usuário não está logado")
    }
  }

  return res.send("Usuário não encontrado");
};







