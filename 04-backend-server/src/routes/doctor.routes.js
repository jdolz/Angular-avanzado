const { Router } = require('express');
const doctorController = require('../controllers/doctor');
const { validarJwt } = require('../middlewares/validarJWT');
const { postDoctorChecks } = require('../middlewares/validators');
const router = Router();

router.get('/all', validarJwt, doctorController.getdoctors);
router.post('/new', validarJwt, postDoctorChecks, doctorController.createNew);
router.put('/update/:id', validarJwt, postDoctorChecks, doctorController.edit);
router.delete('/delete/:id', validarJwt, doctorController.delete);

module.exports = router;