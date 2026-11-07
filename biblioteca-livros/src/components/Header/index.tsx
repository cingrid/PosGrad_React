import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../hooks/useAuth'
import './styles.css'

export default function Header() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <header className="container-header">
      <h1 className="header-logo">Biblioteca da Vila</h1>
      <nav>
        <ul className="header-menu">
          <li>
            <Link to="/home">Livros</Link>
          </li>
          <li>
            <button className="header-sair" onClick={handleLogout}>
              Sair
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}