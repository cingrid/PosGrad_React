import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Container from '../../templates/Container'
import LivroCard from '../../components/LivroCard'
import Modal from '../../components/Modal'
import LivroForm from '../../components/LivroForm'
import { createLivro, getLivros } from '../../services/livros'
import { toastError, toastSuccess } from '../../utils/toast'
import './styles.css'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['livros'],
    queryFn: getLivros,
    retry: false,
  })

  const createMutation = useMutation({
    mutationFn: createLivro,
    onSuccess: () => {
      toastSuccess('Livro cadastrado com sucesso')
      setIsModalOpen(false)
      queryClient.invalidateQueries({ queryKey: ['livros'] })
    },
    onError: () => {
      toastError('Erro ao cadastrar o livro')
    },
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
      <div className="home-topo">
        <h2>Acervo</h2>
        <button className="btn-primario" onClick={() => setIsModalOpen(true)}>
          + Novo livro
        </button>
      </div>

      {renderLista()}

      <Modal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <LivroForm
          textoBotao="Cadastrar livro"
          isPending={createMutation.isPending}
          onCancel={() => setIsModalOpen(false)}
          onSubmit={(formData) => createMutation.mutate(formData)}
        />
      </Modal>
    </Container>
  )
}