require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

const getUsuarioById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT U.clave as clave, U.usuario as usuario, U.contraseña as contrasena FROM mu_usuario U WHERE U.fk_empleado = ($1);';
    const values = [req.params.id];
    client.query(text, values)
    .then((response) => {
        console.log('Completed!', response.rows[0])
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        client.end();
        res.status(500).json({ error: error.toString() });
    })
}

module.exports = {
    getUsuarioById
    // ,[siguientes funciones]
}