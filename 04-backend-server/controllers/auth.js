const User = require('../models/user');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const authController = {};

authController.login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({email});
        if (!userDB) res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });

        const match = bcrypt.compareSync(password, userDB.password);
        if(!match) res.status(400).json({ ok: false, msg: 'Contraseña incorrecta' });

        var token = await generarJWT(userDB.id);
        token = `Bearer ${token}`;

        res.status(200).json({ ok: true, Authorization: token });

    } catch (error) {
        if (err) res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }
};

module.exports = authController;