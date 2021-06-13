const { response } = require('express');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const findController = {};

findController.getAll = async (req, res = response) => {

    try {

        const regex = new RegExp(req.params.name, 'i');

        const [user, doctor, hospital] = await Promise.all([
            User.find({ name: regex }),
            Doctor.find({ name: regex }),
            Hospital.find({ name: regex })
        ]);



        if (!user && !doctor && !hospital) res.status(404).json({ ok: false, msg: 'No encontrado' });

        res.status(200).json({
            ok: true,
            user: (user.length > 0 ? user : undefined),
            doctor: (doctor.length > 0 ? doctor : undefined),
            hospital: (hospital.length > 0 ? hospital : undefined)
        });
    } catch (err) {
        if (err) res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

module.exports = findController;