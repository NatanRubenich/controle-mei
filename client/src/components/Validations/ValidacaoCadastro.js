import * as yup from 'yup';

export const usuarioSchema = yup.object().shape({
  nome: yup
    .string()
    .required("Campo incompleto"),

  sobrenome: yup
    .string()
    .required("Campo incompleto"),

  nomeEmpresa: yup
    .string()
    .required("Campo incompleto"),

  cidade: yup
    .string()
    .required("Campo incompleto"),

  cnpj: yup
    .string()
    .required("Campo incompleto")
    .test('tamanho-cnpj', function (value) {
      const valorNovo = value.replace(/\D/g,'');
      return valorNovo.length === 14;
    }),

  cpf: yup
  .string()
  .required("Campo incompleto")
  .test('tamanho-cpf', function (value) {
    const valorNovo = value.replace(/\D/g,'');
    return valorNovo.length === 11;
  }),

  email: yup
    .string()
    .email("Insira um email válido")
    .required("Campo incompleto"),

  telefone: yup
    .string()
    .required("Campo incompleto")
    .test('tamanho-telefone', function (value) {
      const valorNovo = value.replace(/\D/g,'');
      return valorNovo.length >= 10;
    }),

  senha: yup
    .string()
    .required("Campo incompleto")
    .min(6, "Senha muito curta")
    .max(40),


  senhaConf: yup
    .string()
    .required("Campo incompleto")
    .oneOf([yup.ref('senha'), null], 'Senhas não correspondem')
})

