require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

// FORMATO  CONNECTION STRING postgressql://YourUserName:YourPassword@localhost:5432/YourDatabase

/* ------------------------------ CREATE ------------------------------ */

const createClienteJuridico = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    console.log('llego', req.body.data);
    client.connect();
    const text = 'INSERT INTO MU_CLIENTE_JURIDICO (RIF, Nombre, Telefono, Email, fk_lugar) VALUES ($1, $2, $3, $4, $5);';
    const values = [req.body.data.rif, req.body.data.nombre, req.body.data.telefono, req.body.data.email, req.body.data.fk_lugar];
    client.query(text, values)
    .then((response) => {
        client.end();
        // res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error.stack);
        client.end();
        res.status(500).json({ error: error.toString() });
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
        res.status(500).json({ error: error.toString() });
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
        res.status(500).json({ error: error.toString() });
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
        res.status(500).json({ error: error.toString() });
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
        res.status(500).json({ error: error.toString() });
    })
}

/* ------------------------------ UPDATE ------------------------------ */

const updateClienteJuridicoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    console.log(req.body.data)
    client.connect();
    const text = 'UPDATE MU_CLIENTE_JURIDICO SET Nombre = ($2), RIF = ($3), Email = ($4), Telefono = ($5), fk_lugar = ($6) WHERE Clave = ($1);';
    const values = [req.body.data.clave, req.body.data.nombre, req.body.data.rif, req.body.data.email, req.body.data.telefono, req.body.data.fk_lugar];
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
        res.status(500).json({ error: error.toString() });
    })
}


module.exports = {
    createClienteJuridico,
    getAllClientesJuridicos,
    getClienteNombreById,
    getClienteByRIF,
    getClienteJuridicoById,
    updateClienteJuridicoById,
    deleteClienteJuridicoById,
    // ,[siguientes funciones]
}