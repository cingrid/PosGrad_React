import { useNavigate, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import Container from '../../templates/Container'
import { getLivro } from '../../services/livros'
import './styles.css'

export default function Detalhes() {
  const params = useParams()
  const navigate = useNavigate()
  const id = String(params.id)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['livro', id],
    queryFn: () => getLivro(id),
    retry: false,
  })

  function renderConteudo() {
    if (isLoading) {
      return <p>Carregando livro...</p>
    }
    if (isError || !data) {
      return <p className="detalhes-erro">Livro não encontrado.</p>
    }
    return (
      <div className="detalhes-card">
        <img src={data.imagem} alt={`Capa de ${data.titulo}`} />
        <div className="detalhes-info">
          <h2>{data.titulo}</h2>
          <p className="detalhes-autor">{data.autor}</p>
          <p className="detalhes-meta">
            {data.genero} · {data.ano}
          </p>
          <p className="detalhes-sinopse">{data.sinopse}</p>
        </div>
      </div>
    )
  }

  return (
    <Container>
      <button className="detalhes-voltar" onClick={() => navigate(-1)}>
        ← Voltar
      </button>
      {renderConteudo()}
    </Container>
  )
}