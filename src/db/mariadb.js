const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'verificador_user', // Cambia 'verificador_user' si tu usuario tiene otro nombre
    password: 'verificador_password', // Cambia 'verificador_password' si has configurado otra contraseña
    database: 'verificador', // Asegúrate de que la base de datos esté bien nombrada
    connectionLimit: 10
});

module.exports = pool;
