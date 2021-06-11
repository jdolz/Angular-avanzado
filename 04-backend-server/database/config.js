const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err, res) => {

    if (err) return console.error(`Error al conectar a la base de datos ${err}`);
    console.log(`Conectado a la base de datos ${config.db}`);

});