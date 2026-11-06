# Catálogo de Jogos — Semana 1

Atividade de Linguagem de Programação (CARLPRO), IFSP Câmpus Caraguatatuba.

## Executar

```powershell
npm install
npm start
```

Desenvolvimento: `npm run dev`.
Teste: `node scripts/verificar.js` (com o servidor ativo).
No Postman: GET http://localhost:3000/status. Resposta: HTTP 200 e
`{"status":"API Online - Projeto Semana 1"}`.

## Estrutura

- src/controllers/, src/routes/, src/middlewares/: estrutura para a Semana 2.
- src/server.js: Express com leitor JSON e porta 3000.
- src/prisma.js: instância compartilhada de PrismaClient.
- prisma/schema.prisma: Jogador e Avaliacao, relação 1:N.
- prisma/dev.db: banco SQLite gerado por migração.
- prisma/migrations/: histórico da criação das tabelas.

Um jogador pode ter várias avaliações. Cada avaliação registra jogo, nota,
comentário e a chave estrangeira jogadorId. O email do jogador é único.
Validação da faixa da nota e rotas CRUD ficam para a próxima etapa.

Prisma e Prisma Client foram fixados em 6.19.0 para manter a configuração
CommonJS e o schema solicitado no enunciado. Não há type: module.
A verificação automatizada testou status HTTP, JSON e gravação relacionada
em transação revertida, sem deixar registros de demonstração.
O Postman não foi operado automaticamente.

A instalação apontou quatro alertas altos em dependências transitivas do
Prisma 6.19.0. Não foi aplicada atualização forçada para outra versão principal.
Reavaliar essas dependências antes de disponibilizar a aplicação em produção.

Autor/aluno, dupla e nome do docente não foram informados.
