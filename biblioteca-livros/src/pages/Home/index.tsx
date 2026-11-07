import { useQuery } from '@tanstack/react-query'
import Container from '../../templates/Container'
import LivroCard from '../../components/LivroCard'
import { getLivros } from '../../services/livros'
import './styles.css'

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['livros'],
    queryFn: getLivros,
    retry: false,
  })

  function renderLista() {
    if (isLoading) {
      return <p>Carregando livros...</p>
    }
    if (isError) {
      return <p className="home-erro">Não foi possível carregar os livros.</p>
    }
    if (!data || data.length === 0) {
      return <p>Nenhum livro cadastrado.</p>
    }
    return (
      <div className="home-lista">
        {data.map((livro) => (
          <LivroCard key={livro.id} livro={livro} />
        ))}
      </div>
    )
  }

  return (
    <Container>
      <h2 className="home-titulo">Acervo</h2>
      {renderLista()}
    </Container>
  )
}