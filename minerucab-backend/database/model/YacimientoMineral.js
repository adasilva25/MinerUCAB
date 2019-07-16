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

const createMinYac = (values) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = format('INSERT INTO MU_YACIMIENTO_MINERAL (cantidad, fk_mineral_metalico, fk_mineral_no_metalico, fk_yacimiento) VALUES %L', values);
    client.query(text)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    }) 
}

const updateYacMinMet = (claveYac, info) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'UPDATE MU_YACIMIENTO_MINERAL SET cantidad=($1) WHERE fk_mineral_metalico=($2) AND fk_yacimiento=($3);';
    const values = [info.total, info.id, claveYac];
    client.query(text, values)
    .then((response) => {
        client.end();
    })
    .catch((e) => {
        client.end();
        console.error(e.stack);

    })
}

const updateYacMinNoMet = (claveYac, info) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'UPDATE MU_YACIMIENTO_MINERAL SET cantidad=($1) WHERE fk_mineral_no_metalico=($2) AND fk_yacimiento=($3);';
    const values = [info.total, info.id, claveYac];
    client.query(text, values)
    .then((response) => {
        client.end();
    })
    .catch((e) => {
        client.end();
        console.error(e.stack);

    })
}

const deleteYacMinMet = (claveYac, info) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'DELETE FROM MU_YACIMIENTO_MINERAL WHERE fk_yacimiento = ($1) AND fk_mineral_metalico=($2);';
    const values = [claveYac, info.id];
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

const deleteYacMinNoMet = (claveYac, info) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'DELETE FROM MU_YACIMIENTO_MINERAL WHERE fk_yacimiento = ($1) AND fk_mineral_no_metalico=($2);';
    const values = [claveYac, info.id];
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
    getAllMineralesNoMetalicosByIdYacimiento,
    createMinYac,
    updateYacMinMet,
    updateYacMinNoMet,
    deleteYacMinMet,
    deleteYacMinNoMet
}