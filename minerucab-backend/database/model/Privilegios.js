require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

const getAllPrivilegios = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    client.query('SELECT * FROM mu_privilegio;')
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

const getAllPrivilegiosByIdRol = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT P.clave as clave, P.nombre as nombre, P.tipo as tipo, A.clave as relacion FROM mu_rol R, mu_privilegio P, mu_rol_privilegio A WHERE R.clave=A.fk_rol AND P.clave=A.fk_privilegio AND R.clave = ($1);';
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
    getAllPrivilegios,
    getAllPrivilegiosByIdRol,
    // ,[siguientes funciones]
}