import type { ReactNode } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './styles.css'

interface ContainerProps {
  children: ReactNode
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="container">
      <Header />
      <main className="content">{children}</main>
      <Footer />
    </div>
  )
}