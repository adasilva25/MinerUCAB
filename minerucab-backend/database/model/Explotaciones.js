require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');
const format = require('pg-format');

/* ------------------------------ CREATE ------------------------------ */

const createExplotacion = (info, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO MU_EXPLOTACION (costo_total, duracion, fecha_inicio, fecha_fin, fk_venta, fk_estatus)\n\
                    VALUES ($1, $2, null, null, null, $3) RETURNING Clave';
    const values = [info.explotacion.costo, info.explotacion.duracion, info.explotacion.estatus];
    client.query(text, values)
    .then((res) => {
        client.end();
        callback(res.rows[0].clave)
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    })
}

const createEtapa = (info, claveExplotacion, num, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO MU_ETAPA (nombre, costo_total, duracion, fecha_inicio, fecha_fin, fecha_fin_real, fk_estatus, fk_explotacion)\n\
                    VALUES ($1, $2, $3, null, null, null, $4, $5) RETURNING Clave';
    const values = [info.etapas[num].nombre, info.etapas[num].costo, info.etapas[num].duracion, info.etapas[num].estatus, claveExplotacion];
    client.query(text, values)
    .then((res) => {
        client.end();
        callback(res.rows[0].clave)
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    })
}

const createFase = (info, claveEtapa, numE, numF, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO MU_FASE (nombre, costo, duracion, fecha_inicio, fecha_fin, fecha_fin_real, fk_estatus, fk_etapa)\n\
                    VALUES ($1, $2, $3, null, null, null, $4, $5) RETURNING Clave';
    const values = [info.etapas[numE].fases[numF].nombre, info.etapas[numE].fases[numF].costo, info.etapas[numE].fases[numF].duracion, info.etapas[numE].fases[numF].estatus, claveEtapa];
    client.query(text, values)
    .then((res) => {
        client.end();
        callback(res.rows[0].clave)
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    })
}

const createCargoFase = (values) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = format('INSERT INTO MU_CARGO_FASE (cantidad, sueldo, fk_cargo, fk_fase) VALUES %L', values);
    client.query(text)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    }) 
}

const createTipoMaquinariaFase = (values) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = format('INSERT INTO MU_TIPO_MAQUINARIA_FASE (cantidad, costo, fk_fase, fk_tipo_maquinaria) VALUES %L', values);
    client.query(text)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    }) 
}


/* ------------------------------ READ ------------------------------ */

const getEtapasByIdExplotacion = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'SELECT Clave, nombre, costo_total, duracion FROM MU_ETAPA WHERE fk_explotacion = ($1)';

    const values = [req.params.id];
    client.query(text, values)
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })

    .catch((e) => {
        client.end();
        console.error(e.stack);

    })
}

const getAllExplotaciones = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    client.query('SELECT EX.Clave, EX.costo_total "Costo", EX.fecha_inicio "Fecha inicio", E.nombre estatus FROM MU_EXPLOTACION EX, MU_ESTATUS E WHERE EX.fk_estatus = E.Clave;')
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((e) => {
        client.end();
        console.error(e.stack);
    })
}

module.exports = {
    createExplotacion,
    createEtapa,
    createFase,
    createCargoFase,
    createTipoMaquinariaFase,
    getAllExplotaciones,
    getEtapasByIdExplotacion

    // ,[siguientes funciones]
}