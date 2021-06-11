const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    img: { type: String },
    role: { type: String, default: 'USER_ROLE', required: true },
    google: { type: Boolean, default: false }

});

module.exports = model('User', UserSchema);