const { idValido } = require('./validacao');

function validarId(req, res, next) {
  if (!idValido(req.params.id) || Number(req.params.id) > 2147483647) {
    return res.status(400).json({ erro: 'ID inválido na URL. Utilize um número inteiro positivo válido.' });
  }
  next();
}

module.exports = validarId;
