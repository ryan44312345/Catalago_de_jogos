const prisma = require('../prisma');
const { erroBanco } = require('../middlewares/validacao');
async function criar(req, res) {
  try {
    const registro = await prisma.avaliacao.create({ data: req.body });
    return res.status(201).json(registro);
  } catch (erro) { return erroBanco(erro, res); }
}

async function listar(req, res) {
  try {
    const registros = await prisma.avaliacao.findMany({ include: { jogador: true }, orderBy: { id: 'asc' } });
    return res.status(200).json(registros);
  } catch (erro) { return erroBanco(erro, res); }
}

async function buscarPorId(req, res) {
  try {
    const { id } = req.params;
    const registro = await prisma.avaliacao.findUnique({ where: { id: Number(id) }, include: { jogador: true } });
    if (!registro) return res.status(404).json({ erro: 'Registro não encontrado.' });
    return res.status(200).json(registro);
  } catch (erro) { return erroBanco(erro, res); }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const registro = await prisma.avaliacao.update({ where: { id: Number(id) }, data: req.body });
    return res.status(200).json(registro);
  } catch (erro) { return erroBanco(erro, res); }
}

async function apagar(req, res) {
  try {
    const { id } = req.params;
    await prisma.avaliacao.delete({ where: { id: Number(id) } });
    return res.status(204).send();
  } catch (erro) { return erroBanco(erro, res); }
}

module.exports = { criar, listar, buscarPorId, atualizar, apagar };
