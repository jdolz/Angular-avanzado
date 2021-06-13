const { Router } = require('express');
const findController = require('../controllers/find');
const { validarJwt } = require('../middlewares/validarJWT');
const router = Router();

router.get('/all/:name?', validarJwt, findController.getAll);

module.exports = router;