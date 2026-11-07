import { api } from './api'
import type { Livro } from '../Types'

export async function getLivros(): Promise<Livro[]> {
  const response = await api.get<Livro[]>('/livros')
  return response.data
}

export async function getLivro(id: string): Promise<Livro> {
  const response = await api.get<Livro>(`/livros/${id}`)
  return response.data
}