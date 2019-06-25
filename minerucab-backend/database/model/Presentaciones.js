require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

const getAllPresentaciones = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    client.query('SELECT * FROM mu_presentacion;')
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        client.end();
    })
}

const getAllPresentacionesByIdMineralMetalico = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT P.clave as clave, P.nombre as nombre, A.precio as precio FROM mu_presentacion P, mu_presentacion_mineral A, mu_mineral_metalico M WHERE P.clave=A.fk_presentacion AND M.clave = A.fk_mineral_metalico AND M.clave =($1);';
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

const getAllPresentacionesByIdMineralNoMetalico = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT P.clave as clave, P.nombre as nombre, A.precio as precio FROM mu_presentacion P, mu_presentacion_mineral A, mu_mineral_no_metalico M WHERE P.clave=A.fk_presentacion AND M.clave = A.fk_mineral_no_metalico AND M.clave =($1);';
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
    getAllPresentaciones,
    getAllPresentacionesByIdMineralMetalico,
    getAllPresentacionesByIdMineralNoMetalico
    // ,[siguientes funciones]
}