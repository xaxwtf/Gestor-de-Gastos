
require('dotenv').config();

const dns = require('node:dns');

// Configurar DNS para resolver los registros SRV de MongoDB Atlas
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = require('./app');
const conectarDB = require('./config/database');

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
    try {
        await conectarDB();

        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('No se pudo iniciar el servidor:', error.message);
        process.exit(1);
    }
};

iniciarServidor();
