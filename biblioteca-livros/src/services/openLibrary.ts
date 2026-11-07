import axios from 'axios'

interface OpenLibraryDoc {
  key: string
  title: string
  author_name?: string[]
  first_publish_year?: number
  cover_i?: number
}

interface OpenLibraryResponse {
  docs: OpenLibraryDoc[]
}

export interface LivroSugestao {
  id: string
  titulo: string
  autor: string
  ano?: number
  imagem: string
}

export async function buscarOpenLibrary(
  termo: string,
  signal?: AbortSignal,
): Promise<LivroSugestao[]> {
  const response = await axios.get<OpenLibraryResponse>(
    'https://openlibrary.org/search.json',
    {
      params: {
        q: termo,
        limit: 6,
        fields: 'key,title,author_name,first_publish_year,cover_i',
      },
      signal,
    },
  )

  return response.data.docs.map((doc) => ({
    id: doc.key,
    titulo: doc.title,
    autor: doc.author_name?.[0] ?? 'Autor desconhecido',
    ano: doc.first_publish_year,
    imagem: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
      : '',
  }))
}