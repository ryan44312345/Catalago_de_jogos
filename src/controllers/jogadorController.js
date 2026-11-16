const prisma = require('../prisma');
const { erroBanco } = require('../middlewares/validacao');
async function criar(req, res) {
  try {
    const registro = await prisma.jogador.create({ data: req.body });
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
    const registro = await prisma.jogador.findUnique({ where: { id: Number(id) }, include: { avaliacoes: true } });
    if (!registro) return res.status(404).json({ erro: 'Registro não encontrado.' });
    return res.status(200).json(registro);
  } catch (erro) { return erroBanco(erro, res); }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const registro = await prisma.jogador.update({ where: { id: Number(id) }, data: req.body });
    return res.status(200).json(registro);
  } catch (erro) { return erroBanco(erro, res); }
}

async function apagar(req, res) {
  try {
    const { id } = req.params;
    await prisma.jogador.delete({ where: { id: Number(id) } });
    return res.status(204).send();
  } catch (erro) { return erroBanco(erro, res); }
}

module.exports = { criar, listar, buscarPorId, atualizar, apagar };
