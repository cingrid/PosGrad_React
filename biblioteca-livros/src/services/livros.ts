import { api } from './api'
import type { Livro } from '../Types'

/*export async function getLivros(): Promise<Livro[]> {
  const response = await api.get<Livro[]>('/livros')
  return response.data
}

export async function getLivro(id: string): Promise<Livro> {
  const response = await api.get<Livro>(`/livros/${id}`)
  return response.data
}*/

export async function getLivros(signal?: AbortSignal): Promise<Livro[]> {
  const response = await api.get<Livro[]>('/livros', { signal })
  return response.data
}

export async function getLivro(id: string, signal?: AbortSignal): Promise<Livro> {
  const response = await api.get<Livro>(`/livros/${id}`, { signal })
  return response.data
}

export type LivroInput = Omit<Livro, 'id'>

export async function createLivro(data: LivroInput): Promise<Livro> {
  const response = await api.post<Livro>('/livros', data)
  return response.data
}

export async function updateLivro(id: string, data: LivroInput): Promise<Livro> {
  const response = await api.put<Livro>(`/livros/${id}`, data)
  return response.data
}

export async function deleteLivro(id: string): Promise<void> {
  await api.delete(`/livros/${id}`)
}