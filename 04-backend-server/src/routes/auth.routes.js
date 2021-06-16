const { Router } = require('express');
const authController = require('../controllers/auth');
const { validarJwt } = require('../middlewares/validarJWT');
const { postLoginChecks, postGoogleChecks } = require('../middlewares/validators');
const router = Router();

router.post('/', postLoginChecks, authController.login);
router.post('/google', postGoogleChecks, authController.googleLogin);

module.exports = router;