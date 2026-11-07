import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { buscarOpenLibrary, type LivroSugestao } from '../../services/openLibrary'
import { comTimeout } from '../../utils/timeout'
import { useDebounce } from '../../hooks/useDebounce'
import './styles.css'

const TIMEOUT_MS = 8000

interface BuscaOpenLibraryProps {
  onSelecionar: (sugestao: LivroSugestao) => void
}

export default function BuscaOpenLibrary({ onSelecionar }: BuscaOpenLibraryProps) {
  const [termo, setTermo] = useState('')
  const termoDebounced = useDebounce(termo)
  const podeBuscar = termoDebounced.trim().length >= 3

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ['openlibrary', termoDebounced],
    queryFn: ({ signal }) =>
      comTimeout(buscarOpenLibrary(termoDebounced, signal), TIMEOUT_MS),
    enabled: podeBuscar,
    retry: false,
    staleTime: 1000 * 60 * 5,
  })

  function renderResultado() {
    if (!podeBuscar) {
      return null
    }
    if (isFetching) {
      return <p className="busca-ol-aviso">Buscando...</p>
    }
    if (isError) {
      const demorou = error instanceof Error && error.message === 'Tempo esgotado'
      return (
        <p className="busca-ol-erro">
          {demorou
            ? 'A busca demorou demais. Tente novamente.'
            : 'Não foi possível buscar agora.'}
        </p>
      )
    }
    if (!data || data.length === 0) {
      return <p className="busca-ol-aviso">Nenhum resultado.</p>
    }
    return (
      <ul className="busca-ol-lista">
        {data.map((sugestao) => (
          <li key={sugestao.id}>
            <button type="button" onClick={() => onSelecionar(sugestao)}>
              <strong>{sugestao.titulo}</strong>
              <span>
                {sugestao.autor}
                {sugestao.ano ? ` · ${sugestao.ano}` : ''}
              </span>
            </button>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="busca-ol">
      <label>
        Buscar na Open Library (preenche o formulário)
        <input
          type="text"
          placeholder="Ex.: Dom Casmurro"
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
        />
      </label>
      {renderResultado()}
    </div>
  )
}