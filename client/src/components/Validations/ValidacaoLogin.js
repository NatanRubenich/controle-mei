import * as yup from 'yup';


export const usuarioSchema = yup.object().shape({
  email: yup
    .string()
    .email("Insira um email válido")
    .required("Campo incompleto"),

  senha: yup
    .string()
    .required("Campo incompleto")
})