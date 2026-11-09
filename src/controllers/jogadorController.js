const prisma = require('../prisma');
const { idValido, erroBanco } = require('../middlewares/validacao');
const campos = ["nome","email"];

function validar(body, parcial = false) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return 'Envie um objeto JSON.';
  if (!Object.keys(body).length) return 'Informe os dados do registro.';
  if (Object.keys(body).some(campo => !campos.includes(campo))) return 'Campo desconhecido.';
  for (const campo of campos) {
    if (parcial && body[campo] === undefined) continue;
    if (campo === 'nota') {
      if (!Number.isInteger(body[campo]) || body[campo] < 0 || body[campo] > 10) return 'A nota deve ser um inteiro entre 0 e 10.';
    } else if (campo === 'jogadorId') {
      if (!idValido(body[campo])) return 'jogadorId deve ser um inteiro positivo.';
    } else if (typeof body[campo] !== 'string' || !body[campo].trim()) return campo + ' é obrigatório e deve ser um texto não vazio.';
  }
  if (body.email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return 'Email inválido.';
}

function dados(body) {
  return Object.fromEntries(Object.entries(body).map(([campo, valor]) => [campo, campo === 'jogadorId' ? Number(valor) : typeof valor === 'string' ? valor.trim() : valor]));
}

async function criar(req, res) {
  try {
    const erro = validar(req.body);
    if (erro) return res.status(400).json({ erro });
    const registro = await prisma.jogador.create({ data: dados(req.body) });
    return res.status(201).json(registro);
  } catch (erro) { return erroBanco(erro, res); }
}

async function listar(req, res) {
  try {
    const registros = await prisma.jogador.findMany({ include: { avaliacoes: true }, orderBy: { id: 'asc' } });
    return res.status(200).json(registros);
  } catch (erro) { return erroBanco(erro, res); }
}

async function buscarPorId(req, res) {
  try {
    const { id } = req.params;
    if (!idValido(id)) return res.status(400).json({ erro: 'ID inválido.' });
    const registro = await prisma.jogador.findUnique({ where: { id: Number(id) }, include: { avaliacoes: true } });
    if (!registro) return res.status(404).json({ erro: 'Registro não encontrado.' });
    return res.status(200).json(registro);
  } catch (erro) { return erroBanco(erro, res); }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    if (!idValido(id)) return res.status(400).json({ erro: 'ID inválido.' });
    const erro = validar(req.body, req.method === 'PATCH');
    if (erro) return res.status(400).json({ erro });
    const registro = await prisma.jogador.update({ where: { id: Number(id) }, data: dados(req.body) });
    return res.status(200).json(registro);
  } catch (erro) { return erroBanco(erro, res); }
}

async function apagar(req, res) {
  try {
    const { id } = req.params;
    if (!idValido(id)) return res.status(400).json({ erro: 'ID inválido.' });
    await prisma.jogador.delete({ where: { id: Number(id) } });
    return res.status(204).send();
  } catch (erro) { return erroBanco(erro, res); }
}

module.exports = { criar, listar, buscarPorId, atualizar, apagar };
