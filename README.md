# HTML Constructor

Um construtor visual de HTML que permite criar e editar elementos através de uma interface drag-and-drop intuitiva.

## Funcionalidades

- Interface drag-and-drop para construção de layouts HTML
- Editor visual de atributos HTML
- Pré-visualização em tempo real
- Exportação do código HTML gerado
- Suporte a elementos HTML5 modernos

## Começando

### Pré-requisitos

- Node.js 14.0.0 ou superior
- npm 6.0.0 ou superior

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/swesley400/html-constructor.git
cd html-constructor
```

2. Instale as dependências
```bash
npm install
```

3. Inicie o servidor de desenvolvimento
```bash
npm start
```

O projeto estará disponível em `http://localhost:3000`

## Fluxo de Desenvolvimento

### Branches

Seguimos o seguinte padrão para branches:

- `main`: Branch principal, contém o código em produção
- `develop`: Branch de desenvolvimento, onde novas features são integradas
- `feature/*`: Branches para desenvolvimento de novas funcionalidades
- `bugfix/*`: Branches para correção de bugs
- `release/*`: Branches para preparação de releases

### Criando uma nova feature

1. Crie uma nova branch a partir de `develop`:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/nome-da-feature
```

2. Desenvolva sua feature e faça commits:
```bash
git add .
git commit -m "feat: descrição da sua alteração"
```

3. Envie para o repositório remoto:
```bash
git push origin feature/nome-da-feature
```

4. Crie um Pull Request para a branch `develop`

### Convenções de Commit

Seguimos o padrão Conventional Commits:

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Alteração em documentação
- `style`: Alterações que não afetam o código (espaço, formatação, etc)
- `refactor`: Refatoração de código
- `test`: Adição ou modificação de testes
- `chore`: Alterações em arquivos de build, configurações, etc

## Build e Deploy

### Build local

Para gerar uma build local:

```bash
npm run build
```

Os arquivos serão gerados na pasta `build/`

### Exportando HTML

1. Construa seu layout usando a interface drag-and-drop
2. Clique no botão "Exportar HTML"
3. O código HTML será gerado e você poderá baixá-lo

## Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas alterações (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
