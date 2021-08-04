import Usuario from '../models/usuario.js';
import GrupoTabela from '../models/grupotabela.js';
import ItemTabela from '../models/itemtabela.js';


///////////            DASHBOARD           ///////////////

export const getExtratosDisponiveis = async (req, res) => {
  if(res.locals.usuario) {
    try {
      // Buscando lista de items
      const objUsuario = res.locals.usuario;

      try {
        // Entradas
        const entradas = await ItemTabela.find({
          grupoTabela: objUsuario.grupoTabela._id,
          }, 
          'dataVenda'
        )
        .sort('-dataVenda');

        // Array de meses
        const mesesDisponiveis = [];

        // Mapeando meses
        entradas.map((e) => {
          const data = new Date(e.dataVenda.getFullYear(), e.dataVenda.getMonth(), 1).toLocaleDateString('pt-BR');
          if (mesesDisponiveis.includes(data)) {
            return;
          }
          mesesDisponiveis.push(data);
        });

        return res.send({ mesesDisponiveis });
        
      } catch (error) {
        return res.status(500).send({ error })
      }

    } catch (error) {
      res.status(500).send("Não foi possível receber dados dos meses")
    }
  }

  return res.send("Usuário não encontrado");
};



// Criando Extrato Mensal
export const getExtratoMensal = async (req, res) => {
  if(res.locals.usuario) {
    try {
      // Buscando lista de items
      const objUsuario = res.locals.usuario;
      const data = req.params.mes;
      let [mes, ano] = data.split('-');
      mes = Number(mes);
      ano = Number(ano);
      const dataInicio = new Date(ano, mes - 1, 1);
      const dataFinal = new Date(ano, mes, 1);

      // Objeto 
      const resultado = {
        cnpj: objUsuario.cnpj,
        empreendedor: `${objUsuario.nome} ${objUsuario.sobrenome} ${objUsuario.cpf}`,
        periodo: `${mes}/${ano}`,
        produto: {
          nota: 0,
          semNota: 0
        },
        servico: {
          nota: 0,
          semNota: 0
        },
        revenda: {
          nota: 0,
          semNota: 0
        }
      }

      try {
        const clientesMes = await ItemTabela.find({
          grupoTabela: objUsuario.grupoTabela._id,
          dataVenda: {
            $gte: dataInicio,
            $lt: dataFinal
           }
          });

          clientesMes.map((e) => {
            e.notaFiscal 
            ? resultado[e.tipoVenda].nota = resultado[e.tipoVenda].nota + e.valorFinal
            : resultado[e.tipoVenda].semNota = resultado[e.tipoVenda].semNota + e.valorFinal;
          });

          // Cálculo de valores finais
          resultado.produto.total = resultado.produto.nota + resultado.produto.semNota;
          resultado.servico.total = resultado.servico.nota + resultado.servico.semNota;
          resultado.revenda.total = resultado.revenda.nota + resultado.revenda.semNota;


          // Formatação de cidade e data atual
          const dataAtual = new Date().toLocaleDateString("pt-BR");
          resultado.cidadeEData = `${objUsuario.cidade} - ${dataAtual}`;


          res.send({resultado});




      } catch (error) {
        res.status(500).send("Meses mal formatados ou inexistentes");
      }
      
    } catch (error) {
      res.status(404).send("Meses não encontrados");
    }
  }

  return res.send("Usuário não encontrado");
};