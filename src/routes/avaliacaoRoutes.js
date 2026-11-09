const router = require('express').Router();
const controller = require('../controllers/avaliacaoController');

router.post('/avaliacoes', controller.criar);
router.get('/avaliacoes', controller.listar);
router.get('/avaliacoes/:id', controller.buscarPorId);
router.put('/avaliacoes/:id', controller.atualizar);
router.patch('/avaliacoes/:id', controller.atualizar);
router.delete('/avaliacoes/:id', controller.apagar);

module.exports = router;
