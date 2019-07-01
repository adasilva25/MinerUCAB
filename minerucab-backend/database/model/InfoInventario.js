require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

const getInventario = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    client.query('SELECT I.clave as " ", I.fecha, I.cantidad_actual as "Cantidad actual", Cantidad_transaccion as "Cantidad transaccion", MM.nombre as Mineral, P.nombre as Presentación\n\
                    FROM MU_INVENTARIO I, MU_PRESENTACION_MINERAL PM, MU_PRESENTACION P, MU_MINERAL_METALICO MM\n\
                    WHERE I.fk_presentacion_mineral=PM.clave AND PM.fk_mineral_metalico=MM.clave AND PM.fk_presentacion=P.clave\n\
                    UNION\n\
                 SELECT I.clave as " ", I.fecha, I.cantidad_actual as "Cantidad actual", Cantidad_transaccion as "Cantidad transaccion", MN.nombre as Mineral, P.nombre as Presentación\n\
                    FROM MU_INVENTARIO I, MU_PRESENTACION_MINERAL PM, MU_PRESENTACION P, MU_MINERAL_NO_METALICO MN\n\
                    WHERE I.fk_presentacion_mineral=PM.clave AND PM.fk_mineral_no_metalico=MN.clave AND PM.fk_presentacion=P.clave')
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

const getCantActualByIdPres = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT cantidad_actual, clave FROM MU_INVENTARIO WHERE FECHA = (SELECT MAX(FECHA) FROM MU_INVENTARIO WHERE FK_PRESENTACION_MINERAL = ($1));';
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
    getInventario,
    getCantActualByIdPres,
    // ,[siguientes funciones]
}