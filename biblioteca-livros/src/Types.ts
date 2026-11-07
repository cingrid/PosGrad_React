export interface Usuario {
  id: number
  nome: string
  email: string
}

export interface LoginResponse {
  token: string
  usuario: Usuario
}

export interface Livro {
  id: number
  titulo: string
  autor: string
  genero: string
  ano: number
  imagem: string
  sinopse: string
}