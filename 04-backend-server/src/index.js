const config = require('./config/config');
const app = require('./app');
require('./database/config');


app.listen(config.port, () => {

    console.log(`Servidor corriendo en puerto ${config.port}`);
});