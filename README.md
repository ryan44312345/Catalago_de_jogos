# Catálogo de Jogos

API para cadastrar jogadores e suas avaliações de jogos. Projeto final de Linguagem de Programação (CARLPRO), IFSP Câmpus Caraguatatuba.

## Integrantes do Grupo

- A preencher: nome completo do integrante 1.
- A preencher: nome completo do integrante 2.

## Tecnologias Utilizadas

- Node.js 20.19 ou superior + Express 5.
- Prisma ORM 6 + SQLite.
- Postman (testes de API).
- Git e GitHub.

## Como Rodar o Projeto

1. Clone e entre na pasta:

   ```sh
   git clone https://github.com/ryan44312345/Catalago_de_jogos.git
   cd Catalago_de_jogos
   ```

2. Instale: `npm install`.
3. Copie `.env.example` para `.env` (PowerShell: `Copy-Item .env.example .env`). Preserve o arquivo se já existir. O exemplo define `DATABASE_URL="file:./dev.db"`.
4. Gere o cliente: `npm run db:generate`.
5. Crie as tabelas: `npx prisma migrate dev`. Para apenas aplicar as migrações existentes: `npm run db:deploy`.
6. Inicie: `node src/server.js` ou `npm start`.

Servidor: `http://localhost:3000`. A variável `PORT` altera a porta. No PowerShell com scripts desabilitados, use `npm.cmd` e `npx.cmd`.

## Banco e estrutura

`Jogador` tem id, nome e email único. `Avaliacao` tem id, jogo, nota, comentario e jogadorId. O relacionamento é **1:N**: um jogador possui várias avaliações. Exclua as avaliações antes de excluir seu jogador.

Fluxo: requisição → logger → rota → validação e sanitização → controller → Prisma → SQLite → resposta.

- `src/routes/`: métodos HTTP e aplicação dos middlewares.
- `src/controllers/`: operações Prisma com async/await e try/catch.
- `src/middlewares/validarDados.js`: campos obrigatórios, tipos, trim e conversão de jogadorId.
- `src/middlewares/validarId.js`: valida os parâmetros :id.
- `src/middlewares/logger.js`: registra data, método e URL no terminal.
- `src/middlewares/validacao.js`: auxiliares de ID e tratamento de erros Prisma.
- `src/server.js`: configura Express e tratamento global de erros.
- `prisma/schema.prisma` e `prisma/migrations/`: modelos e migrações.

## Rotas Principais da API

| Método | Jogadores | Avaliações | Resultado |
| --- | --- | --- | --- |
| POST | `/jogadores` | `/avaliacoes` | Cadastra, 201 |
| GET | `/jogadores` | `/avaliacoes` | Lista com relacionamentos, 200 |
| GET | `/jogadores/:id` | `/avaliacoes/:id` | Busca com relacionamentos, 200 |
| PUT | `/jogadores/:id` | `/avaliacoes/:id` | Atualiza todos os campos, 200 |
| PATCH | `/jogadores/:id` | `/avaliacoes/:id` | Atualiza campos enviados, 200 |
| DELETE | `/jogadores/:id` | `/avaliacoes/:id` | Exclui, 204 sem corpo |

`GET /status` verifica a disponibilidade da API. Cadastre primeiro um jogador:

```json
{ "nome": "Ana", "email": "ana@exemplo.com" }
```

Use o ID retornado para cadastrar uma avaliação:

```json
{ "jogo": "Minecraft", "nota": 9, "comentario": "Muito bom!", "jogadorId": 1 }
```

Textos obrigatórios não podem estar em branco e recebem trim(). Email deve ter formato válido. Nota deve ser um número inteiro de 0 a 10. IDs são inteiros positivos dentro do limite do Prisma Int; jogadorId também aceita string numérica e é convertido antes de salvar. Campos desconhecidos são rejeitados. PUT exige todos os campos; PATCH exige pelo menos um campo válido.

Erros usam `{ "erro": "mensagem" }`: 400 para entrada inválida; 404 para registro ou rota ausente; 409 para email duplicado ou conflito de relacionamento; 500 para falha interna.

## Postman e verificação

Importe [collection-postman.json](collection-postman.json) no Postman (formato 2.1). Com a API ativa, execute as 16 requisições em ordem pelo **Collection Runner**. Ajuste baseUrl se necessário. Os scripts salvam jogadorId e avaliacaoId automaticamente, verificam status, sanitização e relacionamentos, e removem os registros ao final. O email usa um identificador aleatório para permitir novas execuções.

A sequência cobre CRUD das duas tabelas, ID inválido, nota inválida, nome em branco, conflito ao excluir jogador com avaliações e busca de registro excluído. Se a execução for interrompida, registros criados podem permanecer. O arquivo foi gerado para importação; ensaie a execução no Postman antes da apresentação.

Após preparar o banco, execute `npm test` para verificar essa collection via HTTP real em uma porta temporária. Não é necessário iniciar o servidor separadamente. O teste usa o banco configurado e limpa os registros que criou.

## Git e entrega

O .gitignore exclui dependências, .env e bancos SQLite locais. Versione o .env.example. Depois de revisar:

```sh
git add .
git commit -m "Versao final da API com middlewares, README e collection do Postman"
git push origin main
```

## Roteiro da apresentação (8 a 10 minutos)

1. Contexto (1–2 min): problema resolvido e relacionamento no schema.
2. Código (2 min): mostrar routes, middlewares, controllers e README; explicar o fluxo até o Prisma.
3. Demonstração (5 min): criar jogador e avaliação (201), listar com relacionamento (200), enviar nota 11 ou ID abc (400), atualizar (200) e excluir avaliação e jogador (204). Mostrar os logs no terminal.

Antes da entrega, preencher os nomes completos e confirmar a publicação no GitHub. Antes da apresentação, importar a collection e ensaiar no Postman.
