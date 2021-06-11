const express = require('express');
const app = express();
require('./database/config');
const appPort = 3700;

// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
})



app.listen(appPort, (req, res, err) => {

    if (err) return console.error(err);

    console.log(`Servidor corriendo en puerto ${appPort}`);
});