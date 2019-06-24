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

const getAllEmpleados = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    client.connect();

    //client.query('SELECT * FROM test_table;')

    client.query('SELECT * FROM mu_empleado;')
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

const getCriticInfoEmpleados = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    client.connect();
    client.query('SELECT clave as clave, ci as Cedula, p_nombre as Nombre, p_apellido as Apellido FROM mu_empleado;')
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

const getEmpleadoByCedula = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT * FROM mu_empleado WHERE ci = ($1);';
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

const getEmpleadoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT * FROM mu_empleado WHERE clave = ($1);';
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

const deleteEmpleadoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'DELETE FROM mu_empleado WHERE clave = ($1);';
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
    getAllEmpleados,
    getCriticInfoEmpleados,
    getEmpleadoByCedula,
    getEmpleadoById,
    deleteEmpleadoById
    // ,[siguientes funciones]
}