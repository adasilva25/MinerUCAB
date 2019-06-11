require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

const getAllCargos = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    client.query('SELECT * FROM cargo;')
    .then((response) => {
        console.log('Completed!', response.rows[0])
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        client.end();
    })
}

const getCargoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT * FROM cargo WHERE id = ($1);';
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
    })
}

module.exports = {
    getAllCargos,
    getCargoById
    // ,[siguientes funciones]
}