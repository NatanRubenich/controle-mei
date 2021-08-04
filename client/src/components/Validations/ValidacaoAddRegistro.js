import * as yup from 'yup';


export const addRegistroSchema = yup.object().shape({
  nomeCliente: yup
    .string()
    .required("Campo incompleto"),

  tipoVenda: yup
    .string()
    .required("Escolha um tipo de venda"),

  dataVenda: yup
    .date()
    .typeError('Escolha uma data válida')
    .required("Campo incompleto"),

  descricao: yup
    .string()
    .required("Campo incompleto"),

  quantidade: yup
    .number()
    .typeError("Insira um número")
    .min(1)
    .required("Campo incompleto"),

  valorUnitario: yup
    .number()
    .transform((o, v) => parseFloat(v.replace(/,/, '.')))
    .typeError("Insira um número")
    .min(0.1)
    .required("Campo incompleto"),

  desconto: yup
    .number()
    .typeError("Insira um número")
    .required("Campo incompleto"),

  notaFiscal: yup
    .string()
    .required("Campo incompleto")

})

