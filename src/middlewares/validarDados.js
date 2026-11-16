const { idValido } = require('./validacao');

function validarDados(campos) {
  return (req, res, next) => {
    const body = req.body;
    const falhar = erro => res.status(400).json({ erro });
    if (!body || typeof body !== 'object' || Array.isArray(body)) return falhar('Envie um objeto JSON.');
    if (!Object.keys(body).length) return falhar('Informe os dados do registro.');
    if (Object.keys(body).some(campo => !campos.includes(campo))) return falhar('Campo desconhecido.');
    for (const campo of campos) {
      if (req.method === 'PATCH' && body[campo] === undefined) continue;
      if (campo === 'nota') {
        if (!Number.isInteger(body[campo]) || body[campo] < 0 || body[campo] > 10) return falhar('A nota deve ser um inteiro entre 0 e 10.');
      } else if (campo === 'jogadorId') {
        if (!idValido(body[campo]) || Number(body[campo]) > 2147483647) return falhar('jogadorId deve ser um inteiro positivo válido.');
        body[campo] = Number(body[campo]);
      } else {
        if (typeof body[campo] !== 'string' || !body[campo].trim()) return falhar(campo + ' é obrigatório e deve ser um texto não vazio.');
        body[campo] = body[campo].trim();
      }
    }
    if (body.email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return falhar('Email inválido.');
    next();
  };
}

module.exports = {
  validarJogador: validarDados(['nome', 'email']),
  validarAvaliacao: validarDados(['jogo', 'nota', 'comentario', 'jogadorId'])
};
