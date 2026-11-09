const express = require('express');
const jogadorRoutes = require('./routes/jogadorRoutes');
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');

const app = express();
const PORTA = process.env.PORT || 3000;

app.use(express.json());
app.use(jogadorRoutes);
app.use(avaliacaoRoutes);

app.get('/status', (req, res) => {
  return res.json({ status: 'API Online - Projeto Semana 2' });
});

app.use((req, res) => res.status(404).json({ erro: 'Rota não encontrada.' }));
app.use((erro, req, res, next) => {
  if (erro.type === 'entity.parse.failed') return res.status(400).json({ erro: 'JSON inválido.' });
  console.error(erro);
  return res.status(500).json({ erro: 'Erro interno do servidor.' });
});

if (require.main === module) app.listen(PORTA, () => {
  console.log(`[SERVIDOR OK] Rodando em http://localhost:${PORTA}`);
});
module.exports = app;
