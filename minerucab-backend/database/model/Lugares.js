require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

const getAllEstados = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    client.query("SELECT E.clave as clave, E.nombre as Estado FROM MU_LUGAR E WHERE tipo = 'Estado';")
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

const getAllMunicipiosByIdEstado = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT M.clave as clave, M.nombre as Municipio FROM MU_LUGAR E, MU_LUGAR M WHERE E.clave = M.fk_lugar AND E.clave = ($1);'
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

const getAllParroquiasByIdMunicipio = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT P.clave as clave, P.nombre as Parroquia FROM MU_LUGAR E, MU_LUGAR M, MU_LUGAR P WHERE E.clave = M.fk_lugar AND M.clave = P.fk_lugar and M.clave = ($1);';
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

const getLugarByIdParroquia = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT E.clave as cestado, E.nombre as estado, M.clave as cmunicipio, M.nombre as municipio, P.nombre as parroquia FROM MU_LUGAR E, MU_LUGAR M, MU_LUGAR P WHERE E.clave = M.fk_lugar AND M.clave = P.fk_lugar and P.clave = ($1);';
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
    getAllEstados,
    getAllMunicipiosByIdEstado,
    getAllParroquiasByIdMunicipio,
    getLugarByIdParroquia
    // ,[siguientes funciones]
}