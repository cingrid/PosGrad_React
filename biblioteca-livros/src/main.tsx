import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { FavoritosProvider } from './contexts/FavoritosProvider'
import './global.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <FavoritosProvider>
      <App />
    </FavoritosProvider>
  </QueryClientProvider>,
)