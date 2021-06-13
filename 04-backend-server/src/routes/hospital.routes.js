const { Router } = require('express');
const hospitalController = require('../controllers/hospital');
const { validarJwt } = require('../middlewares/validarJWT');
const { postHospitalChecks } = require('../middlewares/validators');
const router = Router();

router.get('/all', validarJwt, hospitalController.getHospitals);
router.post('/new', validarJwt, postHospitalChecks, hospitalController.createNew);
router.put('/update/:id', validarJwt, postHospitalChecks, hospitalController.edit);
router.delete('/delete/:id', validarJwt, hospitalController.delete);

module.exports = router;