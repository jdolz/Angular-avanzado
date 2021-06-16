const fs = require('fs');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const deleteImg = (path) => {
    if(fs.existsSync(path)) fs.unlinkSync(path);
}

const updateImg = async (type, id, fileName) => {

    const CASES = {
        'user': await User.findById(id),
        'doctor': await Doctor.findById(id),
        'hospital': await Hospital.findById(id)
    };

    const result = CASES[type] ? CASES[type] : undefined;
    if (!result) return false;

    const oldPath = `src/uploads/${type}/${result.img}`;
    deleteImg(oldPath);

    result.img = fileName;
    await result.save();
    return true;
}

module.exports = updateImg;