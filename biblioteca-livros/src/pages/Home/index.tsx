import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Container from '../../templates/Container'
import LivroCard from '../../components/LivroCard'
import Modal from '../../components/Modal'
import LivroForm from '../../components/LivroForm'
import { createLivro, getLivros } from '../../services/livros'
import { GENEROS } from '../../schemas/livro'
import { useDebounce } from '../../hooks/useDebounce'
import { toastError, toastSuccess } from '../../utils/toast'
import './styles.css'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [busca, setBusca] = useState('')
  const [genero, setGenero] = useState('')
  const buscaDebounced = useDebounce(busca)
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['livros'],
    queryFn: ({ signal }) => getLivros(signal),
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

  const livrosFiltrados = (data ?? []).filter((livro) => {
    const termo = buscaDebounced.toLowerCase().trim()
    const combinaBusca =
      !termo ||
      livro.titulo.toLowerCase().includes(termo) ||
      livro.autor.toLowerCase().includes(termo)
    const combinaGenero = !genero || livro.genero === genero
    return combinaBusca && combinaGenero
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
    if (livrosFiltrados.length === 0) {
      return <p>Nenhum livro encontrado para esses filtros.</p>
    }
    return (
      <div className="home-lista">
        {livrosFiltrados.map((livro) => (
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

      <div className="home-filtros">
        <input
          type="text"
          placeholder="Buscar por título ou autor"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
          <option value="">Todos os gêneros</option>
          {GENEROS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
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