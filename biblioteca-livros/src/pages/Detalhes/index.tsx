import { useParams } from 'react-router'
import Container from '../../templates/Container'

export default function Detalhes() {
  const params = useParams()

  return (
    <Container>
      <h2>Detalhes do livro</h2>
      <p>ID recebido pela URL: {params.id}</p>
    </Container>
  )
}