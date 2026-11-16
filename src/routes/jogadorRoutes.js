const validarId = require('../middlewares/validarId');
const { validarJogador } = require('../middlewares/validarDados');
const router = require('express').Router();
const controller = require('../controllers/jogadorController');

router.post('/jogadores', validarJogador, controller.criar);
router.get('/jogadores', controller.listar);
router.get('/jogadores/:id', validarId, controller.buscarPorId);
router.put('/jogadores/:id', validarId, validarJogador, controller.atualizar);
router.patch('/jogadores/:id', validarId, validarJogador, controller.atualizar);
router.delete('/jogadores/:id', validarId, controller.apagar);

module.exports = router;
