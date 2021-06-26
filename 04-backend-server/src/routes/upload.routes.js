const { Router } = require('express');
const uploadController = require('../controllers/upload');
const { validarJwt } = require('../middlewares/validarJWT');
const router = Router();

router.put('/:type/:id', validarJwt,  uploadController.fileUpload);
router.get('/:type/:img', uploadController.getImage);

module.exports = router;