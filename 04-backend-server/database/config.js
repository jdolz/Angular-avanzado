const mongoose = require('mongoose');

const mongoUrl = 'mongodb+srv://jdolz:mongo_6549@cluster0.qzqzj.mongodb.net/hospitaldb';

mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}, (err) => {

    if (err) return console.error(err);
    console.log(`Conectado a la base de datos ${mongoUrl}`);
    
});