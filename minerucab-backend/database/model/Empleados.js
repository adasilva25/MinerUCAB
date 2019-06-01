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

const getAllEmployees = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    client.connect();
    client.query('SELECT * FROM test_table;')
    .then((response) => {
        console.log('Completed!', response.rows[0])
        client.end();
        // res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        client.end();
    })
}

module.exports = {
    getAllEmployees
    // ,[siguientes funciones]
}