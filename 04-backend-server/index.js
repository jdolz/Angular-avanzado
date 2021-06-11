const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./config/config');
require('./database/config');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// Rutas
app.use('/user', require('./routes/user.routes'));



app.listen(config.port, () => {

    console.log(`Servidor corriendo en puerto ${config.port}`);
});