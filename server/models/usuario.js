import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Tabela from './usuario.js';

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
    trim: true
  }, 
  sobrenome: {
    type: String,
    require: true,
    trim: true
  },
  nomeEmpresa: {
    type: String,
    require: true,
    trim: true
  },
  cnpj: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    trim: true
  },
  telefone: {
    type: Number,
    require: true,
  },
  senha: {
    type: String,
    require: true,
    select: false
  },
  tabela: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tabela'
  }]
}, {
  timestamps: true
});

UsuarioSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;
  next();
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

export default Usuario;