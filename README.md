# 🌍 Around The U.S.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/status-finalizado-brightgreen)
![License](https://img.shields.io/badge/license-educational-lightgrey)

Aplicação web de galeria de lugares turísticos, desenvolvida durante o bootcamp de desenvolvimento web. Consome uma API REST própria para persistir usuários e cartões, com CRUD completo (criar, ler, atualizar, deletar).

**🔗 Deploy:** _[link para o projeto hospedado]_

---

## 📋 Sumário

- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#️-tecnologias-utilizadas)
- [Arquitetura](#️-arquitetura-do-código)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Como executar](#-como-executar)
- [Endpoints da API](#-endpoints-da-api)
- [Aprendizados](#-aprendizados)
- [Melhorias futuras](#-melhorias-futuras)

---

## 🚀 Funcionalidades

### 👤 Perfil do usuário
- Dados carregados diretamente do servidor ao abrir a página (nome, descrição e avatar)
- Edição de nome e descrição, com o formulário pré-preenchido com os dados atuais
- Edição do avatar via link de imagem, com ícone de edição visível ao passar o mouse sobre a foto

### 🖼️ Galeria de cartões
- Cartões iniciais carregados do servidor (nada mais é "mockado" no front)
- Criação de novo cartão (título + URL da imagem)
- Curtir / descurtir, refletindo o estado retornado pela API
- Exclusão com pop-up de confirmação — só remove o cartão se o usuário confirmar
- Botão de excluir some automaticamente em cartões que não pertencem ao usuário logado
- Ampliação de imagem em pop-up dedicado

### ✅ Validações (client-side)
| Formulário | Campo | Regra |
|------------|-------|-------|
| Editar perfil | Nome | 2–40 caracteres |
| Editar perfil | Sobre | 2–200 caracteres |
| Novo local | Título | 2–30 caracteres |
| Novo local | URL da imagem | formato de URL válido |
| Editar avatar | URL da imagem | formato de URL válido |

### 🎨 Experiência do usuário
- Pop-ups fecham por clique no "X", clique fora (overlay) ou tecla `Esc`
- Mensagens de erro específicas por campo, atualizadas em tempo real
- Feedback de carregamento: botões trocam o texto para **"Salvando..."** enquanto aguardam a resposta do servidor
- Erros de rede/servidor tratados e registrados no console, sem quebrar a interface
- Layout responsivo

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Uso |
|------------|-----|
| **HTML5** | Estrutura semântica, `<template>` para os cartões |
| **CSS3** | Estilização com metodologia BEM, arquivos separados por bloco |
| **JavaScript (ES6+)** | Classes, módulos ES (`import`/`export`), Promises, `fetch` |
| **REST API** | Persistência de usuários e cartões |
| **Git/GitHub** | Versionamento |

---

## 🏗️ Arquitetura do código

### Padrões utilizados
- **POO:** cada responsabilidade do projeto vive em sua própria classe
- **Herança:** `PopupWithForm`, `PopupWithImage` e `PopupWithConfirmation` estendem `Popup`, reaproveitando abrir/fechar (clique fora, `Esc`, ícone de fechar)
- **Encapsulamento:** métodos e propriedades "privados" por convenção (prefixo `_`)
- **Injeção de dependência via callbacks:** `Card` recebe `handleCardClick`, `handleLikeClick` e `handleDeleteClick` do `index.js`, sem conhecer a API ou os outros pop-ups diretamente
- **Renderização condicional:** o botão de excluir só é exibido se o cartão pertence ao usuário logado
- **Module pattern:** cada classe em seu próprio arquivo, importada onde é usada

### Classes principais
| Classe | Responsabilidade |
|--------|-------------------|
| `Api` | Todas as chamadas `fetch` ao servidor (usuário, cartões, curtidas, avatar) |
| `Card` | Cria a marcação de um cartão e liga seus eventos (curtir, excluir, ampliar) |
| `Section` | Renderiza uma lista de itens dentro de um container |
| `UserInfo` | Lê e atualiza nome, descrição e avatar exibidos na página |
| `Popup` | Classe base: abrir, fechar, `Esc`, clique fora |
| `PopupWithForm` | Pop-up com formulário (editar perfil, novo cartão, editar avatar), com estado de "Salvando..." |
| `PopupWithImage` | Pop-up de imagem ampliada |
| `PopupWithConfirmation` | Pop-up de "Tem certeza?" antes de excluir um cartão |
| `FormValidator` | Validação genérica de qualquer formulário/input do projeto |

### Fluxo da aplicação
1. `Api.getAppInfo()` busca, em paralelo (`Promise.all`), os dados do usuário e a lista de cartões
2. Com as duas respostas em mãos, `UserInfo` preenche o perfil e `Section` renderiza os cartões
3. Interações do usuário (curtir, excluir, editar, criar) disparam requisições à API
4. A interface só é atualizada **depois** que o servidor confirma a mudança — nunca antes
5. Erros de requisição são capturados em `.catch()` e registrados no console

---

## 📁 Estrutura do projeto

```
web_project_around_pt/
│
├── node_modules/               # dependências (não versionado)
├── scripts/                    # scripts auxiliares do build (Webpack)
├── vendor/                     # bibliotecas/assets de terceiros
│
├── src/
│   ├── blocks/                 # estilos CSS, um arquivo por bloco (BEM)
│   │   ├── card.css
│   │   ├── cards.css
│   │   ├── content.css
│   │   ├── header.css
│   │   ├── page.css
│   │   ├── popup.css
│   │   └── profile.css
│   │
│   ├── components/             # classes JavaScript da aplicação
│   │   ├── Api.js                   # comunicação com a API
│   │   ├── Card.js                  # cartão individual
│   │   ├── FormValidator.js         # validação de formulários
│   │   ├── Popup.js                 # classe base dos pop-ups
│   │   ├── PopupWithForm.js         # pop-up com formulário
│   │   ├── PopupWithImage.js        # pop-up de imagem
│   │   ├── PopupWithConfirmation.js # pop-up de confirmação de exclusão
│   │   ├── Section.js               # renderização de listas
│   │   └── UserInfo.js              # dados do perfil
│   │
│   ├── images/                  # ícones e imagens estáticas
│   │
│   ├── page/
│   │   ├── index.css             # importa os arquivos de src/blocks
│   │   └── index.js               # orquestração da aplicação
│   │
│   └── index.html
│
├── .prettierignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 📦 Como executar

Projeto empacotado com **Webpack**.

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/around-the-us.git

# 2. Entre na pasta do projeto
cd web_project_around_pt

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev

# 5. Gere a build de produção, se precisar
npm run build
```

### Configurando o token da API
Antes de rodar, gere seu token pessoal em `https://around-api.pt-br.tripleten-services.com/v1/users/create` e cole-o em `src/components/Api.js`, na propriedade `authorization` do objeto passado para `new Api({...})`.

---

## 🔗 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/users/me` | Busca dados do usuário logado |
| `PATCH` | `/users/me` | Atualiza nome e descrição do perfil |
| `PATCH` | `/users/me/avatar` | Atualiza a foto do perfil |
| `GET` | `/cards` | Busca todos os cartões |
| `POST` | `/cards` | Cria um novo cartão |
| `DELETE` | `/cards/:id` | Remove um cartão |
| `PUT` | `/cards/:id/likes` | Curte um cartão |
| `DELETE` | `/cards/:id/likes` | Remove a curtida de um cartão |

---

## 📚 Aprendizados

Durante o desenvolvimento deste projeto, foram aplicados e consolidados:

- Programação orientada a objetos em JavaScript (classes, herança, encapsulamento por convenção)
- Organização de código em módulos ES6 (`import`/`export`)
- Consumo de API REST com `fetch` e `Promise` (incluindo `Promise.all` para requisições paralelas)
- Tratamento de erros de rede/servidor com `.catch()`
- Validação de formulários de forma genérica e reutilizável, sem repetir lógica por campo
- Manipulação de `<template>` e clonagem de nós do DOM
- Delegação de responsabilidades entre classes via callbacks, evitando acoplamento direto
- Metodologia BEM para organização do CSS
- Design responsivo

---

## 🎯 Melhorias futuras

- [ ] Autenticação de usuários (login/registro)
- [ ] Compartilhamento de cartões em redes sociais
- [ ] Comentários em cartões
- [ ] Pesquisa e filtros por categoria
- [ ] Modo escuro
- [ ] Internacionalização (i18n)
- [ ] Testes unitários

---

## 👨‍💻 Autor

**Renan Castiglioni**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](#)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](#)

---

## 📄 Licença

Projeto desenvolvido para fins educacionais durante o bootcamp de desenvolvimento web.
