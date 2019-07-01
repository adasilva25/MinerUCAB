require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');
const format = require('pg-format');

/* ------------------------------ READ ------------------------------ */

const getFasesByIdEtapa = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'SELECT F.Clave clave, F.nombre nombre, F.Fecha_inicio fecha_inicio, F.Fecha_fin fecha_fin, F.Fecha_fin_real fecha_fin_real, F.costo costo, F.duracion duracion, E.Nombre estatus FROM MU_FASE F, MU_ESTATUS E WHERE F.fk_etapa = ($1) AND F.fk_estatus = E.Clave';
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

module.exports = {
    getFasesByIdEtapa
    // ,[siguientes funciones]
}