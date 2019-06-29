require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

// FORMATO  CONNECTION STRING postgressql://YourUserName:YourPassword@localhost:5432/YourDatabase

/* ------------------------------ CREATE ------------------------------ */

const createYacimiento = (total, fk_cliente, fk_estatus, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO mu_venta (Total, fk_cliente_natural, fk_estatus) VALUES ($1, $2, $3) RETURNING Clave';
    const values = [total, fk_cliente, fk_estatus];
    client.query(text, values)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        client.end();
        console.error(e.stack);
    })
    
}

const getAllYacimientos = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    client.query('SELECT Y.Clave, Y.Nombre as "Nombre", Y.Tamaño as "Tamaño (Kms)", (SELECT m1.nombre FROM mu_lugar m1, mu_lugar m2, mu_lugar m3 WHERE m3.fk_lugar = m2.clave AND m2.fk_lugar = m1.clave AND m3.clave = Y.fk_lugar) as "Ubicación", E.Nombre as "Estatus" FROM MU_YACIMIENTO Y, MU_ESTATUS E WHERE Y.fk_estatus = E.Clave')
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((e) => {
        client.end();
        console.error(e.stack);
    })
}

const getAllYacimientoInfoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'SELECT Y.Nombre as nombre, Y.descripcion as descripcion, Y.Tamaño as area, Y.fecha_registro fecha_registro, Y.fk_lugar as idParroquia, Y.fk_explotacion clave_explotacion, (SELECT EX.Duracion FROM MU_EXPLOTACION EX WHERE Y.fk_explotacion = EX.Clave) duracion_explotacion, (SELECT EX.costo_total FROM MU_EXPLOTACION EX WHERE Y.fk_explotacion = EX.Clave) costo_explotacion, (SELECT m1.nombre FROM mu_lugar m1, mu_lugar m2, mu_lugar m3 WHERE m3.fk_lugar = m2.clave AND m2.fk_lugar = m1.clave AND m3.clave = Y.fk_lugar) as "estado", (SELECT m2.nombre FROM mu_lugar m1, mu_lugar m2, mu_lugar m3 WHERE m3.fk_lugar = m2.clave AND m2.fk_lugar = m1.clave AND m3.clave = Y.fk_lugar) as municipio, (SELECT m3.nombre FROM mu_lugar m1, mu_lugar m2, mu_lugar m3 WHERE m3.fk_lugar = m2.clave AND m2.fk_lugar = m1.clave AND m3.clave = Y.fk_lugar) as "parroquia", Y.fk_estatus clave_estatus, E.Nombre as "estatus" FROM MU_YACIMIENTO Y, MU_ESTATUS E WHERE Y.fk_estatus = E.Clave AND Y.Clave = ($1);'
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

const getYacimientoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT V.Total, E.Nombre, V.Fecha FROM MU_VENTA V, MU_ESTATUS E WHERE V.Clave = ($1) AND V.fk_estatus = E.Clave;';
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
    createYacimiento,
    getAllYacimientos,
    getAllYacimientoInfoById,
    getYacimientoById
    // ,[siguientes funciones]
}
