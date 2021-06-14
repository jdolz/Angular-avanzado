const { response } = require('express');

const uploadController = {};

uploadController.fileUpload = async (req, res = response) => {

    try {

        res.status(200).json({ ok: true, msg: 'fileUploaded' });
    } catch (err) {
        res.status(500).json({ ok: false, msg: `Error del servidor ${err}` });
    }

}

module.exports = uploadController;