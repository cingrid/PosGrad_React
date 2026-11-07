import { createContext } from 'react'

export interface FavoritosContextProps {
  favoritos: number[]
  isFavorito: (id: number) => boolean
  toggleFavorito: (id: number) => void
  removerFavorito: (id: number) => void
}

export const FavoritosContext = createContext<FavoritosContextProps>(
  {} as FavoritosContextProps,
)