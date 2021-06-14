const express = require('express');
const expressFileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressFileUpload());
app.use(cors());

// Rutas
app.use('/user', require('./routes/user.routes'));
app.use('/login', require('./routes/auth.routes'));
app.use('/hospital', require('./routes/hospital.routes'));
app.use('/doctor', require('./routes/doctor.routes'));
app.use('/find', require('./routes/find.routes'));
app.use('/upload', require('./routes/upload.routes'));

module.exports = app;


