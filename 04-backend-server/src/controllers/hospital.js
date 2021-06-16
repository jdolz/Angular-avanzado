const Hospital = require('../models/hospital');
const { response } = require('express');


const hospitalController = {};

hospitalController.getHospitals = async (req, res = response) => {

    try {
        const hospitals = await Hospital.find({}).populate('user', 'name img');
        if (!hospitals || hospitals.length == 0) return res.status(404).json({ ok: false, msg: 'No hay hospitales' });
        res.status(200).json(hospitals);
    } catch (err) {
        res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

hospitalController.createNew = async (req, res = response) => {

    const uid = req.uid;

    try {
        const { name } = req.body;

        const existeName = await Hospital.findOne({ name });
        if (existeName) return res.status(400).json({ ok: false, msg: 'Hospital ya registrado' });

        const newHospital = new Hospital({ name: name, user: uid, ...req.body });
        await newHospital.save();

        res.status(200).json({ ok: true, msg: 'Hospital creado correctamente' });
    } catch (err) {
        res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

hospitalController.edit = async (req, res = response) => {

    try {
        const { user, ...body } = req.body;

        const HospitalDB = await Hospital.findById(req.params.id);
        if (!HospitalDB) return res.status(404).json({ ok: false, msg: 'Hospital no encontrado' });
        if (HospitalDB.name === body.name) {
            delete body.name;
        } else {
            const existeName = await Hospital.findOne({ name: body.name });
            if (existeName) return res.status(400).json({ ok: false, msg: 'Ya existe un Hospital con ese nombre' });
        }

        const HospitalUpdated = await Hospital.findByIdAndUpdate(req.params.id, { user: req.uid, body }, { new: true });

        res.status(200).json(HospitalUpdated);
    } catch (err) {
        res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

hospitalController.delete = async (req, res = response) => {

    try {

        const HospitalDeleted = await Hospital.findByIdAndDelete(req.params.id, req.body);
        if (!HospitalDeleted) return res.status(404).json({ ok: false, msg: 'Hospital no encontrado' });
        res.status(200).json({ ok: true, msg: 'Hospital eliminado' });
    } catch (err) {
        res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

module.exports = hospitalController;