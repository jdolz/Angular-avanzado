require('dotenv').config();

const config = {
    port: process.env.PORT,
    db: process.env.MONGODB
}

module.exports = config;