const { Router } = require('express');
const userController = require('../controllers/user');
const { validarJwt, validarAdminRole } = require('../middlewares/validarJWT');
const { postUserChecks, putUserChecks } = require('../middlewares/validators');
const router = Router();

router.get('/all', validarJwt, userController.getUsers);
router.post('/new', postUserChecks, userController.createNew);
router.put('/update/:id', validarJwt, validarAdminRole, putUserChecks, userController.edit);
router.delete('/delete/:id', validarJwt, validarAdminRole, userController.delete);

module.exports = router;