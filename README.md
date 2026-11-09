# Catálogo de Jogos — Semana 2

API Express com Prisma e SQLite. Um jogador possui várias avaliações de jogos.

## Executar

Requer Node.js 18 ou superior.

```powershell
npm install
Copy-Item .env.example .env
npm run db:generate
npm run db:deploy
npm start
```

Se `.env` já existir, preserve a configuração. Porta padrão: 3000, configurável pela variável `PORT`. Desenvolvimento: `npm run dev`.

## Rotas

| Método | Avaliações | Jogadores | Sucesso |
| --- | --- | --- | --- |
| POST | /avaliacoes | /jogadores | 201 |
| GET | /avaliacoes | /jogadores | 200 |
| GET | /avaliacoes/:id | /jogadores/:id | 200 |
| PUT | /avaliacoes/:id | /jogadores/:id | 200 |
| PATCH | /avaliacoes/:id | /jogadores/:id | 200 |
| DELETE | /avaliacoes/:id | /jogadores/:id | 204 sem corpo |

`GET /status` verifica a disponibilidade da API. Cadastre primeiro um jogador em `POST /jogadores`:

```json
{ "nome": "Ana", "email": "ana@exemplo.com" }
```

Use o ID retornado em `POST /avaliacoes`:

```json
{ "jogo": "Minecraft", "nota": 9, "comentario": "Muito bom!", "jogadorId": 1 }
```

Os GETs de avaliações usam `include: { jogador: true }`. Os GETs de jogadores incluem `avaliacoes`. PUT exige todos os campos; PATCH aceita atualização parcial. A nota deve ser um inteiro de 0 a 10. IDs são inteiros positivos convertidos com `Number`. Textos não podem ser vazios.

Erros retornam JSON com `erro`: 400 para entrada inválida, 404 para registro ausente, 409 para email duplicado ou conflito de relacionamento e 500 para falha interna. Exclua as avaliações antes de excluir seu jogador.

## Postman

Importe [a collection](postman/Catalogo-de-Jogos-Semana-2.postman_collection.json) pelo botão **Import**. Ela se chama **Catálogo de Jogos - Semana 2**. Com o servidor ativo, execute as oito requisições em ordem ou pelo Collection Runner.

`baseUrl` começa em `http://localhost:3000`. Os testes salvam `jogadorId` e `avaliacaoId` automaticamente. A sequência cria um jogador, executa as cinco requisições principais do CRUD, confirma o 404 após exclusão e exclui o jogador. Verifica também o relacionamento incluído e o retorno 204 sem corpo.

A collection está pronta para importação; a organização na aba lateral e a demonstração devem ser feitas no Postman pelo aluno. O Postman não foi operado automaticamente.

## Testes e organização

Execute `npm test` após preparar o banco. Os testes usam HTTP real, Express, Prisma e SQLite. Verificam CRUD das duas entidades, relacionamentos, PATCH, validações e erros. Removem seus próprios registros ao terminar e não exigem servidor ativo.

- `src/controllers/`: funções async com await e try/catch.
- `src/routes/`: mapeamento dos verbos HTTP.
- `src/middlewares/validacao.js`: validação de IDs e erros do Prisma.
- `src/server.js`: JSON, registro das rotas e inicialização.
- `src/prisma.js`: cliente compartilhado.
- `prisma/migrations/`: histórico do banco.

Prisma permanece em 6.19.0 com CommonJS, conforme a base da Semana 1. Banco e `.env` não são versionados. Preencha os nomes dos alunos e docente na entrega.
