function idValido(valor) {
  return (typeof valor === 'number' || (typeof valor === 'string' && /^\d+$/.test(valor))) &&
    Number.isSafeInteger(Number(valor)) && Number(valor) > 0;
}

function erroBanco(erro, res) {
  if (erro.code === 'P2025') return res.status(404).json({ erro: 'Registro não encontrado.' });
  if (erro.code === 'P2002') return res.status(409).json({ erro: 'Email já cadastrado.' });
  if (erro.code === 'P2003') return res.status(409).json({ erro: 'Relacionamento inválido. Verifique o jogadorId ou as avaliações vinculadas.' });
  console.error(erro);
  return res.status(500).json({ erro: 'Erro ao acessar o banco de dados.' });
}

module.exports = { idValido, erroBanco };
