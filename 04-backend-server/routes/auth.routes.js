const { Router } = require('express');
const authController = require('../controllers/auth');
const { validarJwt } = require('../middlewares/validarJWT');
const { postLoginChecks } = require('../middlewares/validators');
const router = Router();

router.post('/', postLoginChecks, authController.login);

module.exports = router;