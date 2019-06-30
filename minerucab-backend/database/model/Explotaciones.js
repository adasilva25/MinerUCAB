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


const getExplotacionByIdYacimiento = (req, res) =>{
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT C.clave as clave, C.nombre as nombre FROM mu_cargo C, mu_empleado E WHERE C.clave=E.fk_cargo AND E.clave = ($1);';
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
    createExplotacion,
    createEtapa,
    createFase,
    createCargoFase,
    createTipoMaquinariaFase,
    getExplotacionByIdYacimiento
    // ,[siguientes funciones]
}