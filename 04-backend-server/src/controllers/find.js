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
        res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

findController.getConcrete = async (req, res = response) => {

    try {

        const regex = new RegExp(req.params.name, 'i');
        const table = req.params.table;

        // Con Switch
        // let results;
        // switch (table) {
        //     case 'user':
        //         results = await User.find({ name: regex });
        //         break;
        //     case 'doctor':
        //         results =  await Doctor.find({ name: regex });
        //         break;
        //     case 'hospital':
        //         results = await Hospital.find({ name: regex });
        //         break;
        //     default:
        //         results = undefined;
        //         break;
        // }
        // ##########

        // Con Hash table
        const CASES = {
            'user': await User.find({ name: regex }),
            'doctor': await Doctor.find({ name: regex }).populate('user', 'name img').populate('hospital', 'name img'),
            'hospital': await Hospital.find({ name: regex }).populate('user', 'name img')
        };
        const result = CASES[table] ? CASES[table] : undefined;
        // ##########


        if (!result) res.status(400).json({ ok: false, msg: 'La tabla tiene que ser user/doctor/hospital' });
        if (result.length == 0) res.status(404).json({ ok: false, msg: 'Ningún resultado' });

        res.status(200).json({
            ok: true,
            result
        });
    } catch (err) {
        res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

module.exports = findController;