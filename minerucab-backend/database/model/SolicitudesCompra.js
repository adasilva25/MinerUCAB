require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

const insertSolCompra = (info, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO MU_SOLICITUD_COMPRA (total, fk_empresa, fk_estatus, fk_explotacion) VALUES ($1, $2, 8, $3) RETURNING clave';
    const values = [info.total, info.fk_empresa, info.fk_explotacion];
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

const insertDetalleSolCompra = (claveS, info) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO MU_DETALLE_SOLICITUD_COMPRA (cantidad, precio, fk_mineral_empresa, fk_solicitud_compra)\n\
                    VALUES ($1,$2,$3,$4)';
    const values = [info.cantidad, info.total, info.fk_mineral_empresa, claveS];
    client.query(text, values)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    })
}

const updateSC = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    console.log(req.body.data)
    client.connect();
    const text = 'UPDATE MU_SOLICITUD_COMPRA SET fk_estatus=($1) WHERE Clave = ($2);';
    const values = [req.body.data.estatus, req.body.data.clave];
    client.query(text, values)
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.toString() });
        client.end();
    })
}

const getAllSolicitudesDeCompraConEstatusEnProceso = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    client.connect();
    client.query('SELECT SC.Clave "Clave", SC.Fecha "Fecha", SC.Total "Total", E.Nombre as Estatus FROM MU_SOLICITUD_COMPRA SC, MU_ESTATUS E WHERE SC.fk_estatus = E.Clave AND E.Clave = 8;')
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

const getAllSolicitudesDeCompraConEstatusEntregado = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    client.connect();
    client.query('SELECT SC.Clave "Clave", SC.Fecha "Fecha", SC.Total "Total", E.Nombre as Estatus FROM MU_SOLICITUD_COMPRA SC, MU_ESTATUS E WHERE SC.fk_estatus = E.Clave AND E.Clave = 11;')
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
    const text = 'SELECT SC.fk_estatus as estatus, SC.Total "total", SC.Fecha "fecha", E.Clave "clave_empresa", E.rif "rif", E.Nombre nombre_empresa, (SELECT m1.nombre FROM mu_lugar m1, mu_lugar m2, mu_lugar m3 WHERE m3.fk_lugar = m2.clave AND m2.fk_lugar = m1.clave AND m3.clave = E.fk_lugar) as "estado", (SELECT m2.nombre FROM mu_lugar m1, mu_lugar m2, mu_lugar m3 WHERE m3.fk_lugar = m2.clave AND m2.fk_lugar = m1.clave AND m3.clave = E.fk_lugar) as municipio, (SELECT m3.nombre FROM mu_lugar m1, mu_lugar m2, mu_lugar m3 WHERE m3.fk_lugar = m2.clave AND m2.fk_lugar = m1.clave AND m3.clave = E.fk_lugar) as "parroquia" FROM MU_SOLICITUD_COMPRA SC, MU_EMPRESA E WHERE SC.fk_empresa = E.Clave AND SC.clave =($1);';
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

const getEstatusSolicitudDeCompraByIdExplotacion = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT E.nombre FROM MU_SOLICITUD_COMPRA SC, MU_ESTATUS E WHERE SC.fk_estatus=E.clave AND SC.fk_explotacion=($1);';
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

const getMinExpSolicitudDeCompra = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT YM.fk_mineral_metalico as claveMinMet, YM.fk_mineral_no_metalico as claveMinNoMet, YM.cantidad\n\
                    FROM MU_YACIMIENTO Y, MU_YACIMIENTO_MINERAL YM\n\
                    WHERE YM.fk_yacimiento=Y.clave AND Y.fk_explotacion=($1);';
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

const getMinMetComponentesSolicitudDeCompra = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT M.clave, M.nombre, MM.porcentaje FROM MU_MINERAL_MINERAL MM, MU_MINERAL_METALICO M\n\
                    WHERE MM.fk_mineral_metalico_compone=M.clave AND MM.fk_mineral_metalico_compuesto=($1);';
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

const getMinNoMetComponentesSolicitudDeCompra = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT M.clave, M.nombre, MM.porcentaje FROM MU_MINERAL_MINERAL MM, MU_MINERAL_NO_METALICO M\n\
                    WHERE MM.fk_mineral_no_metalico_compone=M.clave AND MM.fk_mineral_no_metalico_compuesto=($1);';
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

const getEmpresaMinMetComponentesSolicitudDeCompra = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT E.clave, E.nombre, ME.precio_venta, ME.clave as relacion FROM MU_EMPRESA E, MU_MINERAL_EMPRESA ME\n\
                    WHERE ME.fk_empresa=E.clave AND ME.fk_mineral_metalico=($1);';
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

const getEmpresaMinNoMetComponentesSolicitudDeCompra = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT E.clave, E.nombre, ME.precio_venta, ME.clave as relacion FROM MU_EMPRESA E, MU_MINERAL_EMPRESA ME\n\
                    WHERE ME.fk_empresa=E.clave AND ME.fk_mineral_no_metalico=($1);';
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
    getAllSolicitudesDeCompraConEstatusEntregado,
    getAllSolicitudesDeCompraConEstatusEnProceso,
    getDetalleSolicitudCompraMineralMetalicoById,
    getDetalleSolicitudCompraMineralNoMetalicoById,
    getEstatusSolicitudDeCompraByIdExplotacion,
    getMinExpSolicitudDeCompra,
    getMinMetComponentesSolicitudDeCompra,
    getMinNoMetComponentesSolicitudDeCompra,
    getEmpresaMinMetComponentesSolicitudDeCompra,
    getEmpresaMinNoMetComponentesSolicitudDeCompra,
    getSolicitudDeCompraInfoById,
    insertSolCompra,
    insertDetalleSolCompra,
    updateSC
}