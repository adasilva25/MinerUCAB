require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

const getAllTiposYacimiento = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    client.query('SELECT * FROM mu_tipo_yacimiento;')
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

const getTipoYacimientoByIdYacimiento = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'SELECT MTY.Clave as clave_tipo_yacimiento, MTY.Nombre as nombre_tipo_yacimiento FROM MU_YACIMIENTO_TIPO_YACIMIENTO MYTY, MU_TIPO_YACIMIENTO MTY WHERE MYTY.fk_yacimiento = ($1) AND MYTY.fk_tipo_yacimiento = MTY.Clave;';
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
    getAllTiposYacimiento,
    getTipoYacimientoByIdYacimiento
    // ,[siguientes funciones]
}