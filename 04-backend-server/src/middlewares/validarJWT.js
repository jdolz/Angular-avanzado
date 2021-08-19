const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validarJwt = (req, res, next) => {

    var token = req.header('Authorization');

    if (!token) res.status(401).json({ ok: false, msg: 'No hay token en la petición' });

    try {

        if (token.startsWith('Bearer')) {
            token = token.substring(7, token.length);
        }

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;
        next();
    } catch (error) {
        res.status(401).json({ ok: false, msg: 'Token no válido' });
    }


}

const validarAdminRole = async (req, res, next) => {

    const uid = req.uid;

    try {

        const userDB = await User.findById(uid);
        if (!userDB) return res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });

        if (userDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({ ok: false, msg: 'Usuario no autorizado' });
        }

        next();
    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error del servidor ${error}` });
    }
}

const validarAdminRoleOrSameUser = async (req, res, next) => {

    const uid = req.uid;
    const id = req.params.id;

    try {



        const userDB = await User.findById(uid);
        if (!userDB) return res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });

        if (userDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {

            return res.status(403).json({ ok: false, msg: 'Usuario no autorizado' });
        }

    } catch (error) {
        res.status(500).json({ ok: false, msg: `Error del servidor ${error}` });
    }
}

module.exports = { validarJwt, validarAdminRole, validarAdminRoleOrSameUser };