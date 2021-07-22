import mongoose from 'mongoose';
import Usuario from './usuario.js';

const TabelaSchema = new mongoose.Schema({
  nomeCliente: {
    type: String,
    require: true,
    trim: true
  }, 
  tipoVenda: {
    type: String,
    require: true,
    trim: true
  },
  dataVenda: {
    type: Date,
    require: true,
  },
  quantidade: {
    type: Number,
    require: true,
  },
  valorUnitario: {
    type: Number,
    require: true,
    trim: true
  },
  descricao: {
    type: String,
    trim: true
  },
  desconto: {
    type: Number,
    require: true,
  },
  notaFiscal: {
    type: Boolean,
    require: true,
  },
  valorFinal: {
    type: Number,
    require: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true
  }
}, {
  timestamps: true
});

const Tabela = mongoose.model('Tabela', TabelaSchema);

export default Tabela;