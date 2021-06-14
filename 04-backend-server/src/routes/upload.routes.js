const { Router } = require('express');
const uploadController = require('../controllers/upload');
const { validarJwt } = require('../middlewares/validarJWT');
const router = Router();

router.put('/:type/:id', validarJwt,  uploadController.fileUpload);

module.exports = router;