const Doctor = require('../models/doctor');
const { response } = require('express');


const doctorController = {};

doctorController.getdoctors = async (req, res = response) => {

    try {
        const doctors = await Doctor.find({});
        if (!doctors || doctors.length == 0) res.status(404).json({ ok: false, msg: 'No hay doctores' });
        res.status(200).json(doctors);
    } catch (err) {
        if (err) res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

doctorController.createNew = async (req, res = response) => {

    try {
        const { name } = req.body;

        const existeName = await Doctor.findOne({ name });
        if (existeName) res.status(400).json({ ok: false, msg: 'Doctor ya registrado' });

        const newDoctor = new Doctor({ name: name, ...req.body });
        await newDoctor.save();

        res.status(200).json({ ok: true, msg: 'Doctor creado correctamente' });
    } catch (err) {
        if (err) res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

doctorController.edit = async (req, res = response) => {

    try {
        const {user, hospital, ...body} = req.body;

        const DoctorDB = await Doctor.findById(req.params.id);
        if (!DoctorDB) res.status(404).json({ ok: false, msg: 'Doctor no encontrado' });
        if (DoctorDB.name === req.body.name) {
            delete body.name;
        } else {
            const existeName = await Doctor.findOne({ name: body.name });
            if (existeName) res.status(400).json({ ok: false, msg: 'Ya existe un Doctor con ese nombre' });
        }

        const DoctorUpdated = await Doctor.findByIdAndUpdate(req.params.id, body, { new: true });
        
        res.status(200).json(DoctorUpdated);
    } catch (err) {
        if (err) res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

doctorController.delete = async (req, res = response) => {

    try {

        const DoctorDeleted = await Doctor.findByIdAndDelete(req.params.id, req.body);
        if (!DoctorDeleted) res.status(404).json({ ok: false, msg: 'Doctor no encontrado' });
        res.status(200).json({ ok: true, msg: 'Doctor eliminado' });
    } catch (err) {
        if (err) res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

module.exports = doctorController;