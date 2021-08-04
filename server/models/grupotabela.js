import mongoose from 'mongoose';

const GrupoTabelaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    require: true
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ItemTabela'
  }],
});

const GrupoTabela = mongoose.model('GrupoTabela', GrupoTabelaSchema);

export default GrupoTabela;