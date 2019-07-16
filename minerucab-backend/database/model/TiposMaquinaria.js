require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

const getAllTiposMaquinaria = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    client.query('SELECT * FROM mu_tipo_maquinaria;')
    .then((response) => {
        console.log('Completed!', response.rows[0])
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        client.end();
        res.status(500).json({ error: error.toString() });
    })
}

const getTipoMaquinariaById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  
    });
    client.connect();
    const text = 'SELECT * FROM mu_tipo_maquinaria WHERE Clave = ($1);';
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

const getTiposMaquinariaByIdFase = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  
    });
    client.connect();
    const text = 'SELECT TMF.Clave clave_tipo_maquinaria_fase, TMF.Cantidad cantidad, TMF.Costo costo, TM.Clave clave, TM.Nombre nombre FROM mu_tipo_maquinaria_fase TMF, MU_TIPO_MAQUINARIA TM WHERE TMF.fk_fase = ($1) AND TMF.fk_tipo_maquinaria = TM.Clave;';
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


const getNumeroMaquinariasTiposMaquinariaByIdFaseIdTipoMaquinaria = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT COUNT(MTMF.clave) asignaciones FROM MU_FASE F, MU_TIPO_MAQUINARIA_FASE TMF, MU_MAQUINARIA_TIPO_MAQUINARIA_FASE MTMF, MU_MAQUINARIA M, MU_TIPO_MAQUINARIA TM WHERE F.clave = TMF.fk_fase AND TMF.clave=MTMF.fk_tipo_maquinaria_fase AND MTMF.fk_maquinaria = M.clave AND TM.clave=TMF.fk_tipo_maquinaria AND F.clave = ($1)  AND TM.clave = ($2);';
    const values = [req.params.id_fase,req.params.id_tipo_maquinaria];
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
    getAllTiposMaquinaria,
    getTipoMaquinariaById,
    getTiposMaquinariaByIdFase,
    getNumeroMaquinariasTiposMaquinariaByIdFaseIdTipoMaquinaria,
    // ,[siguientes funciones]
}