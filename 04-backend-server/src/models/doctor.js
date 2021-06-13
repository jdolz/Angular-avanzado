const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({

    name: { type: String, required: true, unique: true },
    img: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    hospital : { type:Schema.Types.ObjectId, ref: 'Hospital'}
}
);

DoctorSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;

    return object;
});

module.exports = model('Doctor', DoctorSchema);