const { Router } = require('express');
const userController = require('../controllers/user');
const { postUserChecks } = require('../middlewares/validators');
const router = Router();

router.get('/all', userController.getUsers);
router.post('/new', postUserChecks, userController.createNew);

module.exports = router;