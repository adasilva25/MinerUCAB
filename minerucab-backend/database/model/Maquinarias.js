require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

/* ------------------------------ CREATE ------------------------------ */

const createMaquinaria = (req, res) => {
    const info = req.body.data
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO MU_MAQUINARIA (Identificador, Fecha_adquisicion, fk_tipo_maquinaria, fk_estatus) VALUES ($1, $2, $3, $4)';
    const values = [info.identificador, info.fecha_adquisicion, info.fk_tipo_maquinaria, info.fk_estatus];
    client.query(text, values)
    .then((res) => {
        client.end();
        // return res.rows[0].clave;
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
        res.status(500).json({ error: e.stack.toString() });
    })
    
}

/* ------------------------------ READ ------------------------------ */

const getAllMaquinarias = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    client.query('SELECT M.Clave, M.Identificador AS "Serial", M.Fecha_adquisicion AS "Fecha Adquisición", TM.nombre AS "Tipo de Maquinaria", E.Nombre as "Estatus" FROM MU_MAQUINARIA M, MU_TIPO_MAQUINARIA TM, MU_ESTATUS E WHERE M.fk_estatus = E.Clave AND TM.clave = M.fk_tipo_maquinaria;')
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
const getMaquinariaById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT * FROM MU_MAQUINARIA WHERE Clave = ($1);';
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

const updateMaquinariaById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    console.log(req.body.data)
    client.connect();
    const text = 'UPDATE MU_MAQUINARIA SET Identificador = ($1), Fecha_adquisicion = ($2), fk_tipo_maquinaria = ($3), fk_estatus = ($4) WHERE Clave = ($5);';
    const values = [req.body.data.identificador, req.body.data.fecha_adquisicion, req.body.data.fk_tipo_maquinaria, req.body.data.fk_estatus, req.body.data.clave];
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

const getMaquinariasByIdTipoMaquinaria = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    console.log(req.body.data)
    client.connect();
    const text = 'SELECT MA.Clave clave, MA.Identificador identificador FROM MU_MAQUINARIA MA, MU_TIPO_MAQUINARIA TM WHERE TM.Clave = MA.fk_tipo_maquinaria AND TM.Clave = ($1) AND MA.fk_estatus = 1;';
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

/* ------------------------------ DELETE ------------------------------ */

const deleteMaquinariaById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  
    });
    client.connect();
    const text = 'DELETE FROM MU_MAQUINARIA WHERE Clave = ($1);';
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
    createMaquinaria,
    getAllMaquinarias,
    getMaquinariaById,
    getMaquinariasByIdTipoMaquinaria,
    updateMaquinariaById,
    deleteMaquinariaById
    // ,[siguientes funciones]
}