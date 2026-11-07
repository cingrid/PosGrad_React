import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { GENEROS, livroSchema, type LivroFormData } from '../../schemas/livro'
import './styles.css'

interface LivroFormProps {
  defaultValues?: Partial<LivroFormData>
  onSubmit: (data: LivroFormData) => void
  onCancel: () => void
  isPending: boolean
  textoBotao: string
}

export default function LivroForm({
  defaultValues,
  onSubmit,
  onCancel,
  isPending,
  textoBotao,
}: LivroFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LivroFormData>({
    resolver: yupResolver(livroSchema),
    defaultValues,
  })

  return (
    <form className="livro-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>{textoBotao}</h3>

      <label>
        Título
        <input type="text" {...register('titulo')} />
        {errors.titulo?.message && <span className="erro">{errors.titulo.message}</span>}
      </label>

      <label>
        Autor
        <input type="text" {...register('autor')} />
        {errors.autor?.message && <span className="erro">{errors.autor.message}</span>}
      </label>

      <label>
        Gênero
        <select defaultValue="" {...register('genero')}>
          <option value="" disabled>
            Selecione uma opção
          </option>
          {GENEROS.map((genero) => (
            <option key={genero} value={genero}>
              {genero}
            </option>
          ))}
        </select>
        {errors.genero?.message && <span className="erro">{errors.genero.message}</span>}
      </label>

      <label>
        Ano de publicação
        <input type="number" {...register('ano')} />
        {errors.ano?.message && <span className="erro">{errors.ano.message}</span>}
      </label>

      <label>
        URL da capa
        <input type="text" placeholder="https://..." {...register('imagem')} />
        {errors.imagem?.message && <span className="erro">{errors.imagem.message}</span>}
      </label>

      <label>
        Sinopse
        <textarea rows={4} {...register('sinopse')} />
        {errors.sinopse?.message && <span className="erro">{errors.sinopse.message}</span>}
      </label>

      <div className="livro-form-botoes">
        <button type="button" className="btn-secundario" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn-primario" disabled={isPending}>
          {isPending ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  )
}