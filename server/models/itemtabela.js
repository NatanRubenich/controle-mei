import mongoose from 'mongoose';

const ItemTabelaSchema = new mongoose.Schema({
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
  grupoTabela: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GrupoTabela',
    require: true
  }
}, {
  timestamps: true
});

const ItemTabela = mongoose.model('ItemTabela', ItemTabelaSchema);

export default ItemTabela;