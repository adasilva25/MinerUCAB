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
    client.connect();
    const text = 'INSERT INTO MU_CLIENTE_NATURAL (CI, P_nombre, S_nombre, P_apellido, S_apellido, Fecha_nacimiento, Email, Telefono, fk_lugar) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);';
    const values = [req.body.data.ci, req.body.data.p_nombre, req.body.data.s_nombre, req.body.data.p_apellido, req.body.data.s_apellido, req.body.data.fecha_nacimiento, req.body.data.email, req.body.data.telefono, req.body.data.fk_lugar];
    client.query(text, values)
    .then((response) => {
        client.end();
        // res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error.stack);
        res.status(500).json({ error: error.toString() });
        client.end();
    })
}

/* ------------------------------ READ ------------------------------ */

const getAllClientes = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    client.connect();
    client.query('SELECT Clave, p_nombre AS "Nombre", p_apellido AS "Apellido", CI AS "Cédula" FROM MU_CLIENTE_NATURAL;')
    .then((response) => {
        client.end();
        // res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.toString() });
        client.end();
    })
}

const getClienteByCedula = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT * FROM MU_CLIENTE_NATURAL WHERE ci = ($1);';
    const values = [req.params.cedula];
    client.query(text, values)
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.toString() });
        client.end();
    })
}

const getClienteById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT * FROM MU_CLIENTE_NATURAL WHERE Clave = ($1);';
    const values = [req.params.id];
    client.query(text, values)
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.toString() });
        client.end();
    })
}

const getClienteNombreApellidoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT p_nombre, p_apellido FROM MU_CLIENTE_NATURAL WHERE Clave = ($1);';
    const values = [req.params.id];
    client.query(text, values)
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.toString() });
        client.end();
    })
}

/* ------------------------------ UPDATE ------------------------------ */

const updateClienteNaturalById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    console.log(req.body.data)
    client.connect();
    const text = 'UPDATE MU_CLIENTE_NATURAL SET P_nombre = ($1), S_nombre = ($2), P_apellido = ($3), S_apellido = ($4), CI = ($5), Fecha_nacimiento = ($6), Email = ($7), Telefono = ($8), fk_lugar = ($9) WHERE Clave = ($10);';
    const values = [req.body.data.p_nombre, req.body.data.s_nombre, req.body.data.p_apellido, req.body.data.s_apellido, req.body.data.ci, req.body.data.fecha_nacimiento, req.body.data.email, req.body.data.telefono, req.body.data.fk_lugar, req.body.data.clave];
    client.query(text, values)
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.toString() });
        client.end();
    })
}

/* ------------------------------ DELETE ------------------------------ */

const deleteClienteById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  
    });
    client.connect();
    const text = 'DELETE FROM MU_CLIENTE_NATURAL WHERE Clave = ($1);';
    const values = [req.params.id];
    client.query(text, values)
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.toString() });
        client.end();
    })
}

module.exports = {
    createClienteNatural,
    getAllClientes,
    getClienteByCedula,
    getClienteById,
    getClienteNombreApellidoById,
    updateClienteNaturalById,
    deleteClienteById
    // ,[siguientes funciones]
}