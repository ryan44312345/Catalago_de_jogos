const express = require('express');

const app = express();
const PORTA = 3000;

app.use(express.json());

app.get('/status', (req, res) => {
  return res.json({ status: 'API Online - Projeto Semana 1' });
});

app.listen(PORTA, () => {
  console.log(`[SERVIDOR OK] Rodando em http://localhost:${PORTA}`);
});
