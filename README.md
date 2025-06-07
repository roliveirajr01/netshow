# Netshow

Aplicação frontend em React + Vite que lista e reproduz vídeos via HLS, utilizando JSON-Server como mock de API. O objetivo deste projeto é demonstrar:

* Integração com **HLS.js** para playback de vídeo em streaming.
* Navegação com **React Router v7** e animações de transição usando **Framer Motion**.
* Uso de **Swiper** para carrossel de slides responsivo.
* Gerenciamento de estado com **Zustand** (embora não vital neste template).
* Mock de backend com **JSON-Server**.
* Linting e formatação automática via **ESLint**, **Prettier** e **Lint-Staged**.
* Hooks de commit padronizados com **Husky** e **Commitlint**.
* Preparação para testes com **Jest** (tests ainda não implementados).

## Pré-requisitos

* **Node.js** (recomendado usar NVM para gerenciar versões)
* **NVM** (Node Version Manager) para facilitar instalação e troca de versões

### Instalando NVM e definindo Node v24

```bash
# Instalação do NVM (Linux/macOS)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
# ou (Windows): instalar NVM for Windows via instalador oficial

# Carregue o nvm no shell atual
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Instale e use a versão 24.x do Node
nvm install 24
nvm use 24

# Verifique
node -v  # deve exibir v24.x.x
npm -v
```

## Instalação

1. Clone este repositório:

   ```bash
   https://github.com/roliveirajr01/netshow.git
   ```

git clone [https://github.com/roliveirajr01/netshow.git](https://github.com/roliveirajr01/netshow.git)
cd netshow

````

2. Instale as dependências:
   ```bash
npm install
````

## Scripts disponíveis

* `npm run dev`
  Inicia o Vite em modo de desenvolvimento e o JSON-Server simultaneamente.

* `npm run start:vite`
  Apenas o servidor de desenvolvimento do Vite.

* `npm run json-server`
  Levanta o JSON-Server na porta `3001`. A API ficará disponível em `http://localhost:3001/`.

* `npm run build`
  Compila o TypeScript e gera o build de produção via Vite.

* `npm run preview`
  Serve o build de produção localmente.

* `npm run lint`
  Executa o ESLint em todo o projeto.

* `npm test`
  Executa o Jest (nenhum teste está presente ainda). Em breve incluirá cobertura de frontend.

## Estrutura de pastas

```
netshow/
├── public/               # Arquivos estáticos
├── src/                  # Código-fonte
│   ├── api/              # Chamadas ao backend (JSON-Server)
│   ├── assets/           # Imagens, ícones, etc.
│   ├── components/       # Componentes reutilizáveis
│   ├── helpers/          # Funções utilitárias (slugify, mappings)
│   ├── models/           # Tipagens TypeScript
│   ├── pages/            # Páginas (Home, Detail)
│   ├── services/         # Implementação do axios
│   ├── store/            # Controle geral da reprodução de video
│   ├── App.tsx
│   └── main.tsx          # Ponto de entrada
├── db.json               # Mock de dados do JSON-Server
├── tsconfig.json         # Configuração do TypeScript
├── vite.config.ts        # Configuração do Vite
├── .eslintrc.js          # Regras do ESLint
├── .commitlintrc.js      # Configuração do Commitlint
└── package.json          # Metadados e scripts
```

## Tecnologias e bibliotecas

* **React 19**
* **Vite**
* **TypeScript**
* **React Router v7**
* **Framer Motion**
* **HLS.js**
* **Swiper**
* **Zustand**
* **JSON-Server**
* **ESLint**, **lint-staged**, **Husky**, **Commitlint**
* **Jest** (planejado)

## Próximos passos

* Implementar testes unitários e de integração com Jest + React Testing Library.
* Adicionar autenticação e controle de acesso.
* Migrar JSON-Server para um backend real ou Firebase.

---
