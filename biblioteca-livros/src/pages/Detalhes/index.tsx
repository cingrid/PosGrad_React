import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FiEdit, FiTrash } from 'react-icons/fi'
import Container from '../../templates/Container'
import Modal from '../../components/Modal'
import LivroForm from '../../components/LivroForm'
import { deleteLivro, getLivro, updateLivro } from '../../services/livros'
import { toastError, toastSuccess } from '../../utils/toast'
import './styles.css'

export default function Detalhes() {
  const params = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const id = String(params.id)

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['livro', id],
    //queryFn: () => getLivro(id),
    queryFn: ({ signal }) => getLivro(id, signal),
    retry: false,
  })

  const updateMutation = useMutation({
    mutationFn: (formData: Parameters<typeof updateLivro>[1]) =>
      updateLivro(id, formData),
    onSuccess: () => {
      toastSuccess('Livro atualizado com sucesso')
      setIsEditOpen(false)
      queryClient.invalidateQueries({ queryKey: ['livro', id] })
      queryClient.invalidateQueries({ queryKey: ['livros'] })
    },
    onError: () => {
      toastError('Erro ao atualizar o livro')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteLivro(id),
    onSuccess: () => {
      toastSuccess('Livro excluído com sucesso')
      setIsDeleteOpen(false)
      navigate('/home', { replace: true })
      queryClient.invalidateQueries({ queryKey: ['livros'] })
    },
    onError: () => {
      toastError('Erro ao excluir o livro')
    },
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

          <div className="detalhes-acoes">
            <button className="btn-secundario" onClick={() => setIsEditOpen(true)}>
              <FiEdit /> Editar
            </button>
            <button className="btn-perigo" onClick={() => setIsDeleteOpen(true)}>
              <FiTrash /> Excluir
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Dados do livro sem o id, para preencher o formulário de edição
  const valoresIniciais = data
    ? {
        titulo: data.titulo,
        autor: data.autor,
        genero: data.genero,
        ano: data.ano,
        imagem: data.imagem,
        sinopse: data.sinopse,
      }
    : undefined

  return (
    <Container>
      <button className="detalhes-voltar" onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      {renderConteudo()}

      <Modal isModalOpen={isEditOpen} closeModal={() => setIsEditOpen(false)}>
        <LivroForm
          textoBotao="Editar livro"
          defaultValues={valoresIniciais}
          isPending={updateMutation.isPending}
          onCancel={() => setIsEditOpen(false)}
          onSubmit={(formData) => updateMutation.mutate(formData)}
        />
      </Modal>

      <Modal isModalOpen={isDeleteOpen} closeModal={() => setIsDeleteOpen(false)}>
        <div className="detalhes-confirmar">
          <h3>{`Tem certeza que deseja excluir "${data?.titulo}"?`}</h3>
          <p>Essa ação não pode ser desfeita.</p>
          <div className="detalhes-confirmar-botoes">
            <button className="btn-secundario" onClick={() => setIsDeleteOpen(false)}>
              Não
            </button>
            <button
              className="btn-perigo"
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Apagando...' : 'Sim, excluir'}
            </button>
          </div>
        </div>
      </Modal>
    </Container>
  )
}