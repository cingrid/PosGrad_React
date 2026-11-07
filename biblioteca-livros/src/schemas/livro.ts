import * as yup from 'yup'

export const GENEROS = [
  'Romance',
  'Poesia',
  'Conto',
  'Ficção científica',
  'Fantasia',
  'Biografia',
  'Outro',
]

export const livroSchema = yup.object({
  titulo: yup
    .string()
    .required('Título é obrigatório')
    .min(2, 'Mínimo de 2 caracteres'),
  autor: yup.string().required('Autor é obrigatório'),
  genero: yup.string().required('Selecione um gênero'),
  ano: yup
    .number()
    .typeError('Ano inválido')
    .required('Ano é obrigatório')
    .integer('Ano inválido')
    .min(1000, 'Ano inválido')
    .max(new Date().getFullYear(), 'Ano não pode ser no futuro'),
  imagem: yup.string().url('Informe uma URL válida').required('Imagem é obrigatória'),
  sinopse: yup
    .string()
    .required('Sinopse é obrigatória')
    .max(500, 'Máximo de 500 caracteres'),
})

export type LivroFormData = yup.InferType<typeof livroSchema>