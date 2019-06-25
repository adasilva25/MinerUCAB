require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

// FORMATO  CONNECTION STRING postgressql://YourUserName:YourPassword@localhost:5432/YourDatabase

/* ------------------------------ CREATE ------------------------------ */

const createClienteJuridico = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    console.log(req.body.data);
}

/* ------------------------------ DELETE ------------------------------ */

const deleteClienteJuridicoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'DELETE FROM MU_CLIENTE_JURIDICO WHERE Clave = ($1);';
    const values = [req.params.id];
    client.query(text, values)
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        client.end();
    })
}

/* ------------------------------ READ ------------------------------ */

const getAllClientesJuridicos = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    client.connect();
    client.query('SELECT Clave, nombre AS "Nombre", RIF "RIF", Telefono "Teléfono", Email "Email" FROM MU_CLIENTE_JURIDICO;')
    .then((response) => {
        client.end();
        // res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        client.end();
    })
}

const getClienteByRIF = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT * FROM MU_CLIENTE_JURIDICO WHERE rif = ($1);';
    const values = [req.params.rif];
    client.query(text, values)
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        client.end();
    })
}

const getClienteJuridicoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT * FROM MU_CLIENTE_JURIDICO WHERE Clave = ($1);';
    const values = [req.params.id];
    client.query(text, values)
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        client.end();
    })
}

const getClienteNombreById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT nombre FROM MU_CLIENTE_JURIDICO WHERE Clave = ($1);';
    const values = [req.params.id];
    client.query(text, values)
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        client.end();
    })
}

// const deleteClienteById = (req, res) => {
//     const client = new Client({
//         connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
//     });
//     client.connect();
//     const text = 'DELETE FROM MU_CLIENTE_NATURAL WHERE Clave = ($1);';
//     const values = [req.params.id];
//     client.query(text, values)
//     .then((response) => {
//         client.end();
//         res.status(200).json(response.rows)
//     })
//     .catch((error) => {
//         console.log(error);
//         client.end();
//     })
// }

module.exports = {
    deleteClienteJuridicoById,
    getAllClientesJuridicos,
    getClienteNombreById,
    getClienteByRIF,
    getClienteJuridicoById
    // ,[siguientes funciones]
}