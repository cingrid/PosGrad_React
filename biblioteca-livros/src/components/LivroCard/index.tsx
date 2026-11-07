import { useNavigate } from 'react-router'
import type { Livro } from '../../Types'
import './styles.css'

interface LivroCardProps {
  livro: Livro
}

export default function LivroCard({ livro }: LivroCardProps) {
  const navigate = useNavigate()

  function handleNavigate() {
    navigate(`/livro/${livro.id}`)
  }

  return (
    <div className="livro-card" onClick={handleNavigate}>
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