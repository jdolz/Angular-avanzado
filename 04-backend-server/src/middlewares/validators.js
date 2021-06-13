const { check, validationResult } = require('express-validator');

const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).send({ error: errors.mapped() });

    next();
}

const validations = {};

validations.postUserChecks = [
    check('name', 'Name is required').trim().not().isEmpty(),
    check('password', 'Password is required').trim().not().isEmpty(),
    check('email', 'Email is required').trim().isEmail(),
    validator
];

validations.putUserChecks = [
    check('name', 'Name is required').trim().not().isEmpty(),
    check('email', 'Email is required').trim().isEmail(),
    check('role', 'Role is required').trim().not().isEmpty(),
    validator
];

validations.postLoginChecks = [
    check('password', 'Password is required').trim().not().isEmpty(),
    check('email', 'Email is required').trim().isEmail(),
    validator
];

validations.postHospitalChecks = [
    check('name', 'Name is required').trim().not().isEmpty(),
    validator
];



module.exports = validations;
