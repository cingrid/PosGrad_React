import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DB_PATH = join(__dirname, 'db.json')

const PORT = 3001
const TOKEN = 'token-fake-biblioteca'
const SENHA = '123456'
const USUARIO = { id: 1, nome: 'Admin', email: 'admin@biblioteca.com' }

const app = express()
app.use(cors())
app.use(express.json())

const lerDb = () => JSON.parse(readFileSync(DB_PATH, 'utf-8'))
const salvarDb = (db) => writeFileSync(DB_PATH, JSON.stringify(db, null, 2))

// Rota pública: login
app.post('/api/auth/login', (req, res) => {
  const { email, senha } = req.body
  if (email === USUARIO.email && senha === SENHA) {
    return res.status(200).json({ token: TOKEN, usuario: USUARIO })
  }
  return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' })
})

// Middleware: tudo abaixo exige token
const autenticar = (req, res, next) => {
  const authorization = req.headers.authorization || ''
  if (authorization !== `Bearer ${TOKEN}`) {
    return res.status(401).json({ mensagem: 'Não autorizado' })
  }
  next()
}

app.get('/api/livros', autenticar, (req, res) => {
  res.json(lerDb().livros)
})

app.get('/api/livros/:id', autenticar, (req, res) => {
  const livro = lerDb().livros.find((l) => l.id === Number(req.params.id))
  if (!livro) return res.status(404).json({ mensagem: 'Livro não encontrado' })
  res.json(livro)
})

app.post('/api/livros', autenticar, (req, res) => {
  const { titulo, autor, genero, ano, imagem, sinopse } = req.body
  if (!titulo || !autor) {
    return res.status(400).json({ mensagem: 'Título e autor são obrigatórios' })
  }
  const db = lerDb()
  const id = db.livros.length ? Math.max(...db.livros.map((l) => l.id)) + 1 : 1
  const novo = { id, titulo, autor, genero, ano: Number(ano), imagem, sinopse }
  db.livros.push(novo)
  salvarDb(db)
  res.status(201).json(novo)
})

app.put('/api/livros/:id', autenticar, (req, res) => {
  const db = lerDb()
  const indice = db.livros.findIndex((l) => l.id === Number(req.params.id))
  if (indice === -1) return res.status(404).json({ mensagem: 'Livro não encontrado' })
  db.livros[indice] = { ...db.livros[indice], ...req.body, id: db.livros[indice].id }
  salvarDb(db)
  res.json(db.livros[indice])
})

app.delete('/api/livros/:id', autenticar, (req, res) => {
  const db = lerDb()
  const existe = db.livros.some((l) => l.id === Number(req.params.id))
  if (!existe) return res.status(404).json({ mensagem: 'Livro não encontrado' })
  db.livros = db.livros.filter((l) => l.id !== Number(req.params.id))
  salvarDb(db)
  res.status(204).send()
})

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}/api`)
})