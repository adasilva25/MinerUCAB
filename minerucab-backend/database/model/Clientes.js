// const DAOPostgreSQLConnection = require('../postgresql/psql-connection');

// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'andreadasilva',
//   host: 'localhost',
//   database: 'testdb',
//   port: 5432,
// })

// const getAllUsers = (req, res) => {
//     // const client = DAOPostgreSQLConnection();
//     pool.query('SELECT * FROM test_table;', (error, results) => {
//         if (error){
//             throw error;
//         }
//         console.log('Completed!', results.rows[0].id)
//         // client.end();
//         res.status(200).json(results.rows)
//     })
// }

require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

// FORMATO  CONNECTION STRING postgressql://YourUserName:YourPassword@localhost:5432/YourDatabase

/* ------------------------------ CREATE ------------------------------ */

const createClienteNatural = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    console.log(req.body.data);
}

/* ------------------------------ READ ------------------------------ */

const getAllClientes = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    client.connect();
    client.query('SELECT * FROM cliente;')
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

const getClienteByCedula = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT * FROM cliente WHERE ci = ($1);';
    const values = [req.params.cedula];
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

const getClienteById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT * FROM cliente WHERE id = ($1);';
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

const getClienteNombreApellidoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT nombre, apellido FROM cliente WHERE id = ($1);';
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

const deleteClienteById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'DELETE FROM cliente WHERE id = ($1);';
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

module.exports = {
    createClienteNatural,
    getAllClientes,
    getClienteByCedula,
    getClienteById,
    deleteClienteById,
    getClienteNombreApellidoById
    // ,[siguientes funciones]
}