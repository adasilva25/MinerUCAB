require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

const getAllTableColumns = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = ($1);';
    const values = [req.params.table_name];
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
    getAllTableColumns
    // ,[siguientes funciones]
}