require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

// FORMATO  CONNECTION STRING postgressql://YourUserName:YourPassword@localhost:5432/YourDatabase

/* ------------------------------ CREATE ------------------------------ */

const createYacimiento = (total, fk_cliente, fk_estatus, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO mu_venta (Total, fk_cliente_natural, fk_estatus) VALUES ($1, $2, $3) RETURNING Clave';
    const values = [total, fk_cliente, fk_estatus];
    client.query(text, values)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        client.end();
        console.error(e.stack);
    })
    
}

const getAllYacimientos = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    client.query('SELECT Y.Nombre as "Nombre", Y.Tamaño as "Tamaño", E.Nombre as "Estatus", (SELECT m1.nombre FROM mu_lugar m1, mu_lugar m2, mu_lugar m3 WHERE m3.fk_lugar = m2.clave AND m2.fk_lugar = m1.clave AND m3.clave = Y.fk_lugar) as "Lugar" FROM MU_YACIMIENTO Y, MU_ESTATUS E')
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((e) => {
        client.end();
        console.error(e.stack);
    })
}

const getYacimientoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT V.Total, E.Nombre, V.Fecha FROM MU_VENTA V, MU_ESTATUS E WHERE V.Clave = ($1) AND V.fk_estatus = E.Clave;';
    const values = [req.params.id];
    client.query(text, values)
    .then((response) => {
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
    createYacimiento,
    getAllYacimientos,
    getYacimientoById
    // ,[siguientes funciones]
}