# PosGrad_React

**Projeto da disciplina Desenvolvimento de Aplicações Interativas com React**

---

# Biblioteca da Vila — Relatório Técnico

## 1. Identificação do Projeto

**Título:** Biblioteca de Livros — Sistema Web de Gerenciamento de Acervo.

**Descrição:** Aplicação web para gerenciamento de um acervo de livros, com funcionalidades completas de CRUD (*Create, Read, Update e Delete*), desenvolvida utilizando React e TypeScript.

- **Aluna:** Ingrid Munhoz
- **Disciplina:** Desenvolvimento de Aplicações Interativas com React — 26E4_2
- **Professor:** Wesley Bruno

## 2. Objetivo

Desenvolver um sistema web para gerenciar o acervo de uma biblioteca de bairro, permitindo cadastrar, consultar, editar e excluir livros de maneira simples e intuitiva.

A aplicação busca solucionar as dificuldades do controle manual de acervos, oferecendo uma interface dinâmica para consulta e atualização das informações.

Além disso, permite pesquisar livros por meio de uma API externa, facilitando o preenchimento dos dados durante o processo de cadastro.

## 3. Funcionalidades e Requisitos Técnicos

### Feature I — JavaScript moderno e interface React

- Implementação de CRUD completo.
- Utilização de recursos modernos do JavaScript: *Arrow Functions*, *Destructuring*, *Spread Operator* e *Template Literals*.
- Desenvolvimento de componentes reutilizáveis (`Container`, `BookCard`, `Modal` e `Button`).
- Renderização dinâmica de listas utilizando `.map()` e a propriedade `key`.
- Organização e estilização CSS por componente.

### Feature II — Gerenciamento de dados e reatividade

- Utilização do `useState` para gerenciamento de formulários, listas e modais.
- Utilização do `useEffect` para carregamento de dados na montagem dos componentes.
- Renderização condicional para os estados de carregamento, ausência de dados e erro.
- Implementação de Hook personalizado (`useAuth`).
- Utilização da Context API para gerenciamento de estado global.
- Validação e gerenciamento de formulários com React Hook Form e Yup.

### Feature III — API externa e navegação

- Integração com API externa utilizando Axios.
- Configuração de instância Axios e interceptor para gerenciamento de token.
- Gerenciamento de requisições e mutações com React Query (`useQuery`, `useMutation` e `invalidateQueries`).
- Navegação entre páginas utilizando React Router.
- Implementação das rotas:
  - `/` — Página inicial.
  - `/home` — Página principal da aplicação.
  - `/livro/:id` — Página de detalhes do livro.
- Implementação de rotas privadas com verificação de autenticação por token.

## 4. Tecnologias e Bibliotecas

| Tecnologia | Finalidade |
|---|---|
| React 18 | Construção da interface |
| TypeScript | Tipagem estática |
| Vite | Ambiente de desenvolvimento e build |
| React Router | Gerenciamento de rotas |
| Axios | Comunicação com APIs |
| React Query | Gerenciamento de requisições e cache |
| React Hook Form | Gerenciamento de formulários |
| Yup | Validação de dados |
| React Modal | Implementação de janelas modais |
| React Icons | Biblioteca de ícones |
| React Toastify | Notificações e feedback visual |
| CSS puro | Estilização da interface |
| Git e GitHub | Versionamento e hospedagem do código |

## 5. Como Executar o Projeto

### Pré-requisitos

- Node.js instalado.
- npm instalado.
- Git instalado.

### Instalação

**1. Clone o repositório:**

```bash
git clone https://github.com/ingridmunhoz/biblioteca-da-vila.git
```

**2. Acesse a pasta do projeto:**

```bash
cd biblioteca-da-vila
```

**3. Instale as dependências:**

```bash
npm install
```

**4. Execute a aplicação:**

```bash
npm run dev
```

**5. Acesse no navegador:**

```text
http://localhost:5173
```

## 6. Considerações Finais

O projeto Biblioteca da Vila aplica os principais conceitos de desenvolvimento de aplicações interativas com React, integrando componentização, gerenciamento de estado, reatividade, validação de formulários, consumo de APIs externas e navegação.

A implementação permite consolidar conhecimentos de React e TypeScript por meio do desenvolvimento de uma aplicação funcional, organizada e preparada para o gerenciamento de um acervo de livros.
