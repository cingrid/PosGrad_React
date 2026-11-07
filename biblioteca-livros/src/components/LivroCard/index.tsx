import type { MouseEvent } from 'react'
import { useNavigate } from 'react-router'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useFavoritos } from '../../hooks/useFavoritos'
import type { Livro } from '../../Types'
import './styles.css'

interface LivroCardProps {
  livro: Livro
}

export default function LivroCard({ livro }: LivroCardProps) {
  const navigate = useNavigate()
  const { isFavorito, toggleFavorito } = useFavoritos()
  const favorito = isFavorito(livro.id)

  function handleNavigate() {
    navigate(`/livro/${livro.id}`)
  }

  function handleFavorito(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    toggleFavorito(livro.id)
  }

  return (
    <div className="livro-card" onClick={handleNavigate}>
      <button
        className="livro-card-favorito"
        onClick={handleFavorito}
        aria-label={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        {favorito ? <FaHeart color="#d64545" /> : <FaRegHeart />}
      </button>

      <div className="livro-card-imagem">
        <img src={livro.imagem} alt={`Capa de ${livro.titulo}`} />
      </div>
      <h3>{livro.titulo}</h3>
      <p className="livro-card-autor">{livro.autor}</p>
      <span className="livro-card-genero">
        {livro.genero} · {livro.ano}
      </span>
    </div>
  )
}