import { useEffect, useState, type ReactNode } from 'react'
import { FavoritosContext } from './FavoritosContext'

const STORAGE_KEY = '@biblioteca_favoritos'

function lerFavoritosSalvos(): number[] {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY)
    return salvo ? (JSON.parse(salvo) as number[]) : []
  } catch {
    return []
  }
}

interface FavoritosProviderProps {
  children: ReactNode
}

export function FavoritosProvider({ children }: FavoritosProviderProps) {
  const [favoritos, setFavoritos] = useState<number[]>(lerFavoritosSalvos)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos))
  }, [favoritos])

  function isFavorito(id: number) {
    return favoritos.includes(id)
  }

  function toggleFavorito(id: number) {
    setFavoritos((atual) =>
      atual.includes(id) ? atual.filter((f) => f !== id) : [...atual, id],
    )
  }

  function removerFavorito(id: number) {
    setFavoritos((atual) => atual.filter((f) => f !== id))
  }

  return (
    <FavoritosContext.Provider
      value={{ favoritos, isFavorito, toggleFavorito, removerFavorito }}
    >
      {children}
    </FavoritosContext.Provider>
  )
}