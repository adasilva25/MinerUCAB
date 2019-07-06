require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

// FORMATO  CONNECTION STRING postgressql://YourUserName:YourPassword@localhost:5432/YourDatabase

/* ------------------------------ CREATE ------------------------------ */

const createVentaClienteNatural = (total, fk_cliente, fk_estatus, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO mu_venta (Total, fk_cliente_natural, fk_estatus) VALUES ($1, $2, $3) RETURNING Clave';
    const values = [total, fk_cliente, fk_estatus];
    client.query(text, values)
    .then((res) => {
        console.log(res.rows[0].clave);
        client.end();
        callback(res.rows[0].clave)
        // return res.rows[0].clave;
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    })
    
}

const createVentaClienteJuridico = (total, fk_cliente, fk_estatus, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    client.connect();
    const text = 'INSERT INTO mu_venta (Total, fk_cliente_juridico, fk_estatus) VALUES ($1, $2, $3) RETURNING Clave';
    const values = [total, fk_cliente, fk_estatus];
    client.query(text, values)
    .then((res) => {
        console.log(res.rows[0].clave);
        client.end();
        callback(res.rows[0].clave)
        // return res.rows[0].clave;
    })
    .catch((e) => {
        client.end();
        console.error(e.stack);
    })
}

const getVentaById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT V.Total, E.Nombre, E.clave clave_estatus, V.Fecha FROM MU_VENTA V, MU_ESTATUS E WHERE V.Clave = ($1) AND V.fk_estatus = E.Clave;';
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

const getAllVentasClientesNaturalesConEstatusEnProceso = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    client.connect();
    client.query('SELECT V.Clave as Clave, C.p_nombre as Nombre, C.p_apellido as Apellido, V.Total as "Total", V.Fecha as Fecha, E.Nombre "Estatus" FROM MU_VENTA V, MU_CLIENTE_NATURAL C, MU_ESTATUS E WHERE V.fk_cliente_natural IS NOT NULL AND V.fk_cliente_natural = C.Clave AND V.fk_estatus = E.Clave AND E.Clave = 8;')
    .then((response) => {
        client.end();
        // res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        client.end();
        res.status(500).json({ error: error.toString() });
    })
}

const getAllVentasClientesNaturalesConEstatusProcesada = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    client.connect();
    client.query('SELECT V.Clave as Clave, C.p_nombre as Nombre, C.p_apellido as Apellido, V.Total as "Total", V.Fecha as Fecha, E.Nombre "Estatus" FROM MU_VENTA V, MU_CLIENTE_NATURAL C, MU_ESTATUS E WHERE V.fk_cliente_natural IS NOT NULL AND V.fk_cliente_natural = C.Clave AND V.fk_estatus = E.Clave AND E.Clave = 7;')
    .then((response) => {
        client.end();
        // res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        client.end();
        res.status(500).json({ error: error.toString() });
    })
}

const getAllVentasClientesJuridicosConEstatusProcesada = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    client.connect();
    client.query('SELECT V.Clave as Clave, C.nombre as Nombre, V.Total as "Total", V.Fecha as Fecha, E.Nombre "Estatus" FROM MU_VENTA V, MU_CLIENTE_JURIDICO C, MU_ESTATUS E WHERE V.fk_cliente_juridico IS NOT NULL AND V.fk_cliente_juridico = C.Clave AND E.Clave = V.fk_estatus AND E.Clave = 7;')
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

const getAllVentasClientesJuridicosConEstatusEnProceso = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    client.connect();
    client.query('SELECT V.Clave as Clave, C.nombre as Nombre, V.Total as "Total", V.Fecha as Fecha, E.Nombre "Estatus" FROM MU_VENTA V, MU_CLIENTE_JURIDICO C, MU_ESTATUS E WHERE V.fk_cliente_juridico IS NOT NULL AND V.fk_cliente_juridico = C.Clave AND E.Clave = V.fk_estatus AND E.Clave = 8;')
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

const getFkClienteNaturalEnVentaById = (claveVenta, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  
    });
    console.log('claveClienteNatural');
    client.connect();
    const text = 'SELECT fk_cliente_natural FROM MU_VENTA WHERE Clave = ($1);';
    const values = [claveVenta];
    client.query(text, values)
    .then((response) => {
        client.end();
        // res.status(200).json(response.rows)
        console.log('response',response.rows[0].fk_cliente_natural)
        callback(response.rows[0].fk_cliente_natural)
    })
    .catch((error) => {
        client.end();
        console.log(error);
    })
}

const getFkClienteJuridicoEnVentaById = (claveVenta, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  
    });
    console.log('claveClienteJuridico');
    client.connect();
    const text = 'SELECT fk_cliente_juridico FROM MU_VENTA WHERE Clave = ($1);';
    const values = [claveVenta];
    client.query(text, values)
    .then((response) => {
        client.end();
        // res.status(200).json(response.rows)
        console.log('response',response.rows[0].fk_cliente_juridico)
        callback(response.rows[0].fk_cliente_juridico)
    })
    .catch((error) => {
        client.end();
        console.log(error);
    })
}

const deleteVentaById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'DELETE FROM MU_VENTA WHERE Clave = ($1);';
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
    createVentaClienteNatural,
    createVentaClienteJuridico,
    getAllVentasClientesNaturalesConEstatusEnProceso,
    getAllVentasClientesNaturalesConEstatusProcesada,
    getAllVentasClientesJuridicosConEstatusProcesada,
    getAllVentasClientesJuridicosConEstatusEnProceso,
    getFkClienteJuridicoEnVentaById,
    getFkClienteNaturalEnVentaById,
    getVentaById,
    deleteVentaById
    // ,[siguientes funciones]
}