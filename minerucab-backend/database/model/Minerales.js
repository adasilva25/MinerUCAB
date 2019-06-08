require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

const getMinerales = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    client.query('SELECT * FROM mineral;')
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
    getMinerales
    // ,[siguientes funciones]
}