import { BrowserRouter, Routes, Route } from 'react-router'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Home from './pages/Home'
import Detalhes from './pages/Detalhes'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/livro/:id" element={<Detalhes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}