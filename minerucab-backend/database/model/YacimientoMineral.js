require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');
const format = require('pg-format');

const getAllMineralesMetalicosByIdYacimiento = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT M.Clave clave_mineral_metalico, M.nombre nombre_mineral_metalico, YM.Cantidad cantidad_mineral_metalico FROM MU_MINERAL_METALICO M, MU_YACIMIENTO_MINERAL YM WHERE YM.fk_yacimiento = ($1) AND YM.fk_mineral_metalico = M.Clave;';
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

const getAllMineralesNoMetalicosByIdYacimiento = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    client.connect();
    const text = 'SELECT M.Clave clave_mineral_metalico, M.nombre nombre_mineral_metalico, YM.Cantidad cantidad_mineral_metalico FROM MU_MINERAL_NO_METALICO M, MU_YACIMIENTO_MINERAL YM WHERE YM.fk_yacimiento = ($1) AND YM.fk_mineral_no_metalico = M.Clave;';
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
    getAllMineralesMetalicosByIdYacimiento,
    getAllMineralesNoMetalicosByIdYacimiento
}