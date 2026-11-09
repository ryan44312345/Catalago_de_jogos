const router = require('express').Router();
const controller = require('../controllers/jogadorController');

router.post('/jogadores', controller.criar);
router.get('/jogadores', controller.listar);
router.get('/jogadores/:id', controller.buscarPorId);
router.put('/jogadores/:id', controller.atualizar);
router.patch('/jogadores/:id', controller.atualizar);
router.delete('/jogadores/:id', controller.apagar);

module.exports = router;
