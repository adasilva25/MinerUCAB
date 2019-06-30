require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

const getAllSolicitudesDeCompra = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    client.query('SELECT SC.Clave "Clave", SC.Fecha "Fecha", SC.Total "Total", E.Nombre FROM MU_SOLICITUD_COMPRA SC, MU_ESTATUS E WHERE SC.fk_estatus = E.Clave;')
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

const getSolicitudDeCompraInfoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT SC.Total "total", SC.Fecha "fecha", E.Clave "clave_empresa", E.rif "rif", E.Nombre nombre_empresa, (SELECT m1.nombre FROM mu_lugar m1, mu_lugar m2, mu_lugar m3 WHERE m3.fk_lugar = m2.clave AND m2.fk_lugar = m1.clave AND m3.clave = E.fk_lugar) as "estado", (SELECT m2.nombre FROM mu_lugar m1, mu_lugar m2, mu_lugar m3 WHERE m3.fk_lugar = m2.clave AND m2.fk_lugar = m1.clave AND m3.clave = E.fk_lugar) as municipio, (SELECT m3.nombre FROM mu_lugar m1, mu_lugar m2, mu_lugar m3 WHERE m3.fk_lugar = m2.clave AND m2.fk_lugar = m1.clave AND m3.clave = E.fk_lugar) as "parroquia" FROM MU_SOLICITUD_COMPRA SC, MU_EMPRESA E WHERE SC.fk_empresa = E.Clave AND SC.clave =($1);';
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

const getDetalleSolicitudCompraMineralMetalicoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT DSC.Cantidad "cantidad", DSC.Precio precio, M.Nombre FROM MU_DETALLE_SOLICITUD_COMPRA DSC, MU_MINERAL_EMPRESA ME, MU_MINERAL_METALICO M WHERE DSC.fk_solicitud_compra = ($1) AND ME.Clave = DSC.fk_mineral_empresa AND ME.fk_mineral_metalico = M.Clave;';
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

const getDetalleSolicitudCompraMineralNoMetalicoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT DSC.Cantidad "cantidad", DSC.Precio precio, M.Nombre FROM MU_DETALLE_SOLICITUD_COMPRA DSC, MU_MINERAL_EMPRESA ME, MU_MINERAL_NO_METALICO M WHERE DSC.fk_solicitud_compra = ($1) AND ME.Clave = DSC.fk_mineral_empresa AND ME.fk_mineral_no_metalico = M.Clave;';
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
    getAllSolicitudesDeCompra,
    getDetalleSolicitudCompraMineralMetalicoById,
    getDetalleSolicitudCompraMineralNoMetalicoById,
    getSolicitudDeCompraInfoById
}