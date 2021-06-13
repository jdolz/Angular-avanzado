const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');

const userController = {};

userController.getUsers = async (req, res = response) => {

    try {
        const users = await User.find({});
        if (!users || users.length == 0) res.status(404).json({ ok: false, msg: 'No hay usuarios' });
        res.status(200).json(users);
    } catch (err) {
        if (err) res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

userController.createNew = async (req, res = response) => {

    try {
        const { name, email, password } = req.body;

        const existeEmail = await User.findOne({ email });
        if (existeEmail) res.status(400).json({ ok: false, msg: 'Usuario ya registrado' });



        const newUser = new User({ name: name, email: email, password: password, ...req.body });
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);
        await newUser.save();

        var token = await generarJWT(newUser.id);
        token = `Bearer ${token}`;

        res.status(200).json({ ok: true, msg: 'Usuario creado correctamente', Authorization: token });
    } catch (err) {
        if (err) res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

userController.edit = async (req, res = response) => {

    try {
        delete req.body.password;
        delete req.body.google;

        const userDB = await User.findById(req.params.id);
        if (!userDB) res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });
        if (userDB.email === req.body.email) {
            delete req.body.email;
        } else {
            const existeEmail = await User.findOne({ email: req.body.email });
            if (existeEmail) res.status(400).json({ ok: false, msg: 'Ya existe un usuario con ese email' });
        }

        const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        res.status(200).json(userUpdated);
    } catch (err) {
        if (err) res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

userController.delete = async (req, res = response) => {

    try {

        const userDeleted = await User.findByIdAndDelete(req.params.id, req.body);
        if (!userDeleted) res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });
        res.status(200).json({ ok: true, msg: 'Usuario eliminado' });
    } catch (err) {
        if (err) res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

module.exports = userController;