const User = require('../models/user');
const { response } = require('express');

const userController = {};

userController.getUsers = async (req, res) => {

    try {
        const users = await User.find({});
        if (!users || users.length == 0) res.status(404).json({ message: 'No hay usuarios' });
        res.status(200).json(users);
    } catch (err) {
        if (err) res.status(500).json({ message: `Error del servidor ${err}` });
    }

}

userController.createNew = async (req, res = response) => {

    try {
        const { name, email, password } = req.body;
        const existeEmail = await User.findOne({ email });
        if (existeEmail) res.status(400).json({ message: 'Usuario ya registrado' });
        const newUser = new User({ name: name, email: email, password: password, ...req.body });
        await newUser.save();

        res.status(200).json({ message: 'Usuario creado correctamente' });
    } catch (err) {
        if (err) res.status(500).json({ message: `Error del servidor ${err}` });
    }

}

module.exports = userController;