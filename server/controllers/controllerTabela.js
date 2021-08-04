import Usuario from '../models/usuario.js';
import GrupoTabela from '../models/grupotabela.js';
import ItemTabela from '../models/itemtabela.js';

//////////    LISTAR REGISTROS DO USUARIO        //////////
export const getTabelaController = async (req, res) => {
  if(res.locals.usuario) {
    try {
      // Buscando lista de items
      const objUsuario = res.locals.usuario;
      const query = await ItemTabela
        .find({ grupoTabela: objUsuario.grupoTabela._id })
        .sort('-createdAt')
        .limit(11)
        .skip(10 * req.params.pagina );

      
      return res.send({query});

    } catch (error) {
      res.send("Não foi possível receber dados")
    }
  }

  return res.send("Usuário não encontrado");
};


///////////            DASHBOARD           ///////////////

export const getDashboardMes = async (req, res) => {
  if(res.locals.usuario) {
    try {
      // Buscando lista de items
      const objUsuario = res.locals.usuario;

      // Datas
      const data = new Date();
      const diaInicialMes = new Date(data.getFullYear(), data.getMonth(), 1);
      const diaFinalMes  = new Date(data.getFullYear(), data.getMonth() + 1, 0);
      const anoAtualInicio = new Date(data.getFullYear(), 0, 1);
      const anoAtualFinal = new Date(data.getFullYear() + 1, 0, 1);
      
                  
      ///////////////////////////////////////
      ///              MÊS 

      // Query de clientes - MÊS
      const clientesMes = await ItemTabela.find({
        grupoTabela: objUsuario.grupoTabela._id,
        dataVenda: {
          $gte: diaInicialMes,
          $lt: diaFinalMes
         }
       });

      // Clientes únicos - MÊS
      const clientesUnicos = await ItemTabela
        .find({
        grupoTabela: objUsuario.grupoTabela._id,
        dataVenda: {
          $gte: diaInicialMes,
          $lt: diaFinalMes
         }
       })
        .distinct('nomeCliente');
      
      const quantClientesUnicos = clientesUnicos.length;

      // Número de vendas realizadas - MÊS
      const vendasMes = clientesMes.length;

      // Cálculos de rendimento - MÊS
      const valoresMes = clientesMes.map(e => e.valorFinal);
      const rendimentoMes = valoresMes.reduce((a, b) => a + b, 0);

      // Média de valor - MÊS
      const media = Math.round(rendimentoMes / vendasMes);

      // Tipo de venda
      const tipoVenda = {
        servico: 0,
        produto: 0,
        revenda: 0
      }
      const tipoVendaElemento = clientesMes.map(e => e.tipoVenda);
      tipoVendaElemento.map((e) => {
        if(e === 'produto') {
          tipoVenda.produto = tipoVenda.produto + 1;
        }
        if(e === 'servico') {
          tipoVenda.servico = tipoVenda.servico + 1;
        }
        if(e === 'revenda') {
          tipoVenda.revenda = tipoVenda.revenda + 1;
        }
      });
      
      return res.send({ 
        vendas: vendasMes, 
        clientesUnicos: quantClientesUnicos, 
        rendimento: rendimentoMes, 
        media,
        tipoVenda
      });

    } catch (error) {
      res.status(500).send("Não foi possível receber dados")
    }
  }

  return res.send("Usuário não encontrado");
};


///////////////////////////////////////
///              ANO
export const getDashboardAno = async (req, res) => {
  if(res.locals.usuario) {
    try {
      // Buscando lista de items
      const objUsuario = res.locals.usuario;

      // Datas
      const data = new Date();
      const anoAtualInicio = new Date(data.getFullYear(), 0, 1);
      const anoAtualFinal = new Date(data.getFullYear() + 1, 0, 1);


      // Query de clientes - ANO
      const clientesAno = await ItemTabela.find({
        grupoTabela: objUsuario.grupoTabela._id,
        dataVenda: {
          $gte: anoAtualInicio,
          $lt: anoAtualFinal
         }
       });

      // Clientes únicos - ANO
      const clientesUnicos = await ItemTabela
        .find({
        grupoTabela: objUsuario.grupoTabela._id,
        dataVenda: {
          $gte: anoAtualInicio,
          $lt: anoAtualFinal
         }
       })
        .distinct('nomeCliente');
      
      const quantClientesUnicos = clientesUnicos.length;

      // Número de vendas realizadas - ANO
      const vendasAno = clientesAno.length;

      // Cálculos de rendimento - ANO
      const valoresAno = clientesAno.map(e => e.valorFinal);
      const rendimentoAno = valoresAno.reduce((a, b) => a + b, 0);

      // Média de valor - ANO
      const media = Math.round(rendimentoAno / vendasAno);

      // Tipo de venda
      const tipoVenda = {
        servico: 0,
        produto: 0,
        revenda: 0
      }
      const tipoVendaElemento = clientesAno.map(e => e.tipoVenda);
      tipoVendaElemento.map((e) => {
        if(e === 'produto') {
          tipoVenda.produto = tipoVenda.produto + 1;
        }
        if(e === 'servico') {
          tipoVenda.servico = tipoVenda.servico + 1;
        }
        if(e === 'revenda') {
          tipoVenda.revenda = tipoVenda.revenda + 1;
        }
      });

      return res.send({ 
        vendas: vendasAno, 
        clientesUnicos: quantClientesUnicos, 
        rendimento: rendimentoAno, 
        media,
        tipoVenda
      });

    } catch (error) {
      res.status(500).send("Não foi possível receber dados");
    }
  }

  return res.send("Usuário não encontrado");
};




//////////        CRIAR NOVA ENTRADA           //////////
export const postTabelaController = async (req, res) => {
  if(res.locals.usuario) {
    const objUsuario = res.locals.usuario;
    try {
      const tabela = await GrupoTabela.findById(objUsuario.grupoTabela._id);

      try {
        // Encontrando a tabela do usuário
        const idTabela = await tabela._id;

        // Criando o item novo com o req.body
        const novoItemTabela = await ItemTabela.create({ ...req.body, grupoTabela: idTabela});
        
        try {
          await tabela.items.push(novoItemTabela);
          await tabela.save();
  
          res.send(tabela);
        }
        catch (error) {
          res.send("Erro ao salvar item");
        }

      } catch (error) {
        res.send("Erro ao criar tabela");
      }

    } catch (error) {
      return res.send("Erro ao acessar tabela");
    }

    
    return res.send({ usuarioReq: objUsuario, body: req.body });
  }
};




//////////        DELETAR ITEM           //////////
export const deleteTabelaController = async (req, res) => {
  if(res.locals.usuario) {
    const objUsuario = res.locals.usuario;
    try {
      const item = await ItemTabela.findById(req.body.id);

      try {
        if( item.grupoTabela.toString() === objUsuario.grupoTabela.toString() ){
          await item.delete(req.body.id);
          res.status(200).send("ok");
        }
      } catch (error) {
        res.status(500);
      }

    } catch (error) {
      return res.send("Erro ao encontrar item");
    }
  } else {
    res.status(500).send("Usuário não encontrado");
  }
};


//////////        EDITAR ITEM            //////////
//////////        CRIAR NOVA ENTRADA           //////////
export const editarTabelaController = async (req, res) => {
  if(res.locals.usuario) {
    const objUsuario = res.locals.usuario;
    try {
      const itemTabela = await ItemTabela.findByIdAndUpdate(req.body.id, req.body.form);
      res.send(itemTabela);

    } catch (error) {
      return res.send("Erro ao acessar tabela");
    }

    
    return res.send({ usuarioReq: objUsuario, body: req.body });
  }
};