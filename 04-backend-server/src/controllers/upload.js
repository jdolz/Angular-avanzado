const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const updateImg = require('../helpers/update-img');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');
const path = require('path');

const uploadController = {};

uploadController.fileUpload = async (req, res = response) => {

    const { type, id } = req.params;
    try {
        const CASES = [
            'user',
            'doctor',
            'hospital'
        ];

        const result = CASES.includes(type);
        if (!result) return res.status(400).json({ ok: false, msg: 'Debe ser de tipo user/doctor/hospital' });

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ ok: false, msg: 'No files were uploaded.' });
        }

        const file = req.files.img;
        const fileSplited = file.name.split('.');
        const extension = fileSplited[fileSplited.length - 1];

        const VALID_EXTENSIONS = [
            'png',
            'jpg',
            'jpeg',
            'gif'
        ];

        const extResult = VALID_EXTENSIONS.includes(extension);
        if (!extResult) return res.status(400).json({ ok: false, msg: 'Debe ser de tipo png/jpg/jpeg/gif' });

        const fileName = `${uuidv4()}.${extension}`;
        const path = `src/uploads/${type}/${fileName}`;

        const ok = await updateImg(type, id, fileName);
        if (!ok) return res.status(400).json({ ok: false, msg: `No existe ese ${type}` });

        file.mv(path, (err) => {
            if (err) res.status(500).json({ ok: false, msg: `Error al mover la imagen ${err}` });

            res.status(200).json({ ok: true, msg: 'Archivo subido!', fileName });
        });


    } catch (err) {
        res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

uploadController.getImage = async (req, res = response) => {
    const { type, img } = req.params;

    try {

        const fileSplited = img.split('.');
        const extension = fileSplited[fileSplited.length - 1];

        const VALID_EXTENSIONS = [
            'png',
            'jpg',
            'jpeg',
            'gif'
        ];

        const extResult = VALID_EXTENSIONS.includes(extension);
        if (!extResult) return res.status(400).json({ ok: false, msg: 'Debe ser de tipo png/jpg/jpeg/gif' });

        const VALID_TYPES = [
            'user',
            'doctor',
            'hospital'
        ];

        const typeResult = VALID_TYPES.includes(type);
        if (!typeResult) return res.status(400).json({ ok: false, msg: 'Debe ser de tipo user/doctor/hospital' });

        const CASES = {
            'user': await User.findOne({ img: img }),
            'doctor': await Doctor.findOne({ img: img }),
            'hospital': await Hospital.findOne({ img: img })
        };

        const result = CASES[type] ? CASES[type] : undefined;
        if (!result || result.length == 0) {
            const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
            return res.sendFile(pathImg);
        }
        const pathImg = path.join(__dirname, `../uploads/${type}/${result.img}`);

        res.sendFile(pathImg);

    } catch (err) {
        res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }
}

module.exports = uploadController;