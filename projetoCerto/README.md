# 🧠 Quiz UTFPR - Gincana

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

Aplicação web interativa de Quiz desenvolvida para a Gincana da UTFPR. O sistema permite que jogadores testem seus conhecimentos em diversas categorias e oferece um painel administrativo completo para o gerenciamento de perguntas.

🔗 **Acesse o projeto online:** [utfpr-quiz.vercel.app](https://utfpr-quiz.vercel.app)

---

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Como Rodar o Projeto](#-como-rodar-o-projeto)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Estrutura do Projeto](#-estrutura-do-projeto)

---

## 🚀 Funcionalidades

### 👤 Área do Jogador
* **Autenticação:** Login e Cadastro de usuários com interface moderna.
* **Seleção de Categorias:** Escolha entre temas como Filantrópicas, Esportivas, Recreativas e Culturais.
* **Gameplay:** Interface de perguntas e respostas com feedback visual imediato (acerto/erro).
* **Resultado:** Tela de desempenho com gráficos animados e pontuação final.

### 🛠️ Área Administrativa (Quiz Manager)
* **CRUD de Perguntas:** Criação, Leitura, Atualização e Exclusão de perguntas diretamente no banco de dados.
* **Banco de Perguntas:** Listagem completa com filtros de busca e categoria.
* **Configurações Globais:**
    * **Tema:** Alternância entre Modo Claro (Light) e Escuro (Dark).
    * **Internacionalização (i18n):** Suporte completo para Português (BR) e Inglês (US).

---

## 💻 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

* **[React](https://react.dev/) (v19):** Biblioteca Javascript para construção da interface.
* **[Vite](https://vitejs.dev/):** Ferramenta de build rápida e otimizada.
* **[Tailwind CSS](https://tailwindcss.com/):** Framework de CSS utility-first para estilização responsiva e suporte a Dark Mode.
* **[Supabase](https://supabase.com/):** Backend-as-a-Service utilizado para banco de dados (PostgreSQL) e persistência das perguntas.
* **[React Router DOM](https://reactrouter.com/) (v7):** Gerenciamento de rotas e navegação SPA.
* **Context API:** Gerenciamento de estado global para Temas e Idiomas.

---

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:
* [Node.js](https://nodejs.org/en/) (Versão 18 ou superior recomendada).
* Um gerenciador de pacotes (NPM ou Yarn).

---

## 🔧 Como Rodar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/projeto-dw-aps.git](https://github.com/seu-usuario/projeto-dw-aps.git)
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd projetoCerto
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto (baseado nas chaves do seu projeto Supabase). Veja a seção [Variáveis de Ambiente](#-variáveis-de-ambiente) abaixo.

5.  **Execute o projeto:**
    ```bash
    npm run dev
    ```

6.  **Acesse no navegador:**
    O projeto estará rodando geralmente em `http://localhost:5173`.

---

## 🔐 Variáveis de Ambiente

Para que a conexão com o banco de dados funcione, você deve criar um arquivo `.env` na raiz do projeto com as seguintes chaves do Supabase:

```env
VITE_SUPABASE_URL=sua_url_do_supabse_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_aqui