const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

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

        file.mv(path, (err) => {
            if (err) res.status(500).json({ ok: false, msg: `Error al mover la imagen ${err}` });

            res.status(200).json({ ok: true, msg: 'Archivo subido!', fileName });
        });


    } catch (err) {
        res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

module.exports = uploadController;