const validarId = require('../middlewares/validarId');
const { validarAvaliacao } = require('../middlewares/validarDados');
const router = require('express').Router();
const controller = require('../controllers/avaliacaoController');

router.post('/avaliacoes', validarAvaliacao, controller.criar);
router.get('/avaliacoes', controller.listar);
router.get('/avaliacoes/:id', validarId, controller.buscarPorId);
router.put('/avaliacoes/:id', validarId, validarAvaliacao, controller.atualizar);
router.patch('/avaliacoes/:id', validarId, validarAvaliacao, controller.atualizar);
router.delete('/avaliacoes/:id', validarId, controller.apagar);

module.exports = router;
