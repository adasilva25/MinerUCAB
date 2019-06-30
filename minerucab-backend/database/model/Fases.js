require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');
const format = require('pg-format');

/* ------------------------------ READ ------------------------------ */

const getFasesByIdEtapa = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'SELECT Clave, nombre, costo, duracion FROM MU_FASE WHERE fk_etapa = ($1)';
    const values = [req.params.id];
    client.query(text, values)
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((e) => {
        client.end();
        console.error(e.stack);
    })
}

module.exports = {
    getFasesByIdEtapa
    // ,[siguientes funciones]
}