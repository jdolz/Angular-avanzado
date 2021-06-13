const jwt = require('jsonwebtoken');

const validarJwt = (req, res, next) => {

    var token = req.header('Authorization');

    if(!token) res.status(401).json({ok: false, msg:'No hay token en la petición'});

    try {

        if(token.startsWith('Bearer')){
            token = token.substring(7, token.length);
        }

        const {uid} = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;
        next();
    } catch (error) {
        res.status(401).json({ok: false, msg:'Token no válido'});
    }

    
}

module.exports = { validarJwt };