const Doctor = require('../models/doctor');
const { response } = require('express');


const doctorController = {};

doctorController.getdoctors = async (req, res = response) => {
    
    try {
        const doctors = await Doctor.find({}).populate('user', 'name img').populate('hospital', 'name img');
    
        if (!doctors || doctors.length == 0) return res.status(404).json({ ok: false, msg: 'No hay doctores' });
        res.status(200).json({ok: true, doctors});
    } catch (err) {
        res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }
    
}

doctorController.getdoctor = async (req, res = response) => {
    const _id = req.params.id;
    
    try {
        const doctor = await Doctor.findById(_id).populate('user', 'name img').populate('hospital', 'name img');
    
        if (!doctor) return res.status(404).json({ ok: false, msg: 'No existe ese doctor' });
        res.status(200).json({ok: true, doctor});
    } catch (err) {
        res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }
    

}

doctorController.createNew = async (req, res = response) => {

    const uid = req.uid;

    try {
        const { name } = req.body;

        const existeName = await Doctor.findOne({ name });
        if (existeName) return res.status(400).json({ ok: false, msg: 'Doctor ya registrado' });

        const newDoctor = new Doctor({ name: name, user: uid, ...req.body });
        await newDoctor.save();

        res.status(200).json({ ok: true, msg: 'Doctor creado correctamente', doctor: newDoctor});
    } catch (err) {
        res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

doctorController.edit = async (req, res = response) => {

    const body = { user: req.uid, ...req.body };

    try {
        
        const DoctorDB = await Doctor.findById(req.params.id);
        if (!DoctorDB) return res.status(404).json({ ok: false, msg: 'Doctor no encontrado' });
        if (DoctorDB.name === req.body.name) {
            delete req.body.name;
        } else {
            const existeName = await Doctor.findOne({ name: req.body.name });
            if (existeName) return res.status(400).json({ ok: false, msg: 'Ya existe un Doctor con ese nombre' });
        }

        const DoctorUpdated = await Doctor.findByIdAndUpdate(req.params.id, body, { new: true });

        res.status(200).json(DoctorUpdated);
    } catch (err) {
        res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

doctorController.delete = async (req, res = response) => {

    try {

        const DoctorDeleted = await Doctor.findByIdAndDelete(req.params.id, req.body);
        if (!DoctorDeleted) return res.status(404).json({ ok: false, msg: 'Doctor no encontrado' });
        res.status(200).json({ ok: true, msg: 'Doctor eliminado' });
    } catch (err) {
        res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

module.exports = doctorController;