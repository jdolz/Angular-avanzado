const User = require('../models/user');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google');

const authController = {};

authController.login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email });
        if (!userDB) return res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });

        const match = bcrypt.compareSync(password, userDB.password);
        if (!match) return res.status(400).json({ ok: false, msg: 'Contraseña incorrecta' });

        var token = await generarJWT(userDB.id);
        token = `Bearer ${token}`;

        res.status(200).json({ ok: true, Authorization: token });

    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }
};

authController.googleLogin = async (req, res = response) => {

    try {

        const { name, email, picture } = await googleVerify(req.body.token);

        let user;
        userDB = await User.findOne({ email });

        if (userDB) { user = userDB; user.google = true; }
        else { user = new User({ name, email, img: picture, password: '@@@', google: true }); }

        await user.save();

        var token = await generarJWT(user.id);
        token = `Bearer ${token}`;

        res.status(200).json({ ok: true, Authorization: token });

    } catch (err) {
        res.status(401).json({ ok: false, msg: 'Token no válido' });
    }

}

authController.renewToken = async (req, res = response) => {

    const uid = req.uid;

    var token = await generarJWT(uid);
    token = `Bearer ${token}`;

    const user = await User.findById(uid);

    res.status(200).json({ ok: true, msg: 'Token renovado', Authorization: token, user: user });

}
module.exports = authController;