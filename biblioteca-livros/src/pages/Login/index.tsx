import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { api } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'
import { toastError, toastSuccess } from '../../utils/toast'
import type { LoginResponse } from '../../Types'
import './styles.css'

interface LoginBody {
  email: string
  senha: string
}

async function postLogin(body: LoginBody): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/auth/login', body)
  return response.data
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      signIn(data)
      toastSuccess(`Bem-vinda, ${data.usuario.nome}!`)
      navigate('/home')
    },
    onError: () => {
      toastError('Usuário ou senha inválidos')
    },
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email || !senha) {
      toastError('Preencha e-mail e senha')
      return
    }
    loginMutation.mutate({ email, senha })
  }

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Biblioteca da Vila</h1>
        <p>Entre para acessar o acervo</p>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}