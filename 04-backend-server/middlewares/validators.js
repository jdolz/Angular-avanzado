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

module.exports = validations;
