import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { LoginResponse, Usuario } from '../Types'

interface AuthProps {
  token: string
  usuario: Usuario | null
  signIn: (data: LoginResponse) => void
  logout: () => void
}

export const useAuth = create<AuthProps>()(
  persist(
    (set) => ({
      token: '',
      usuario: null,

      signIn: (data) => set({ token: data.token, usuario: data.usuario }),

      logout: () => set({ token: '', usuario: null }),
    }),
    {
      name: '@biblioteca_auth',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)