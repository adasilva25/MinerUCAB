require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');
const format = require('pg-format');

/* ------------------------------ CREATE ------------------------------ */

const createYacimiento = (info, claveExplotacion, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO MU_YACIMIENTO (nombre, descripcion, fecha_registro, "tamaño", fk_lugar, fk_estatus, fk_explotacion)\n\
                    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING Clave';
    const values = [info.yacimiento.nombre, info.yacimiento.descripcion, info.yacimiento.fecha, info.yacimiento.area, info.yacimiento.ubicacion.parroquia, info.yacimiento.estatus, claveExplotacion];
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

const insertTipoYacimiento = (info, claveYacimiento) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO MU_YACIMIENTO_TIPO_YACIMIENTO (fk_yacimiento, fk_tipo_yacimiento) VALUES ($1, $2);';
    const values = [claveYacimiento, info.yacimiento.tipo]
    client.query(text, values)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    }) 
}

const createYacMineralMet = (values) => {
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

const createYacMineralNoMet = (values) => {
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

module.exports = {
    createYacimiento,
    insertTipoYacimiento,
    createYacMineralMet,
    createYacMineralNoMet
    // ,[siguientes funciones]
}