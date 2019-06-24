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
        console.error(e.stack);
        client.end();
    })
}

const getVentaById = (req, res) => {
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
    })
}

const getAllVentasClientesNaturales = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    client.connect();
    client.query('SELECT V.Clave as Clave, V.Total as Total, V.Fecha as Fecha, C.p_nombre as Nombre FROM MU_VENTA V, MU_CLIENTE_NATURAL C WHERE V.fk_cliente_natural IS NOT NULL AND V.fk_cliente_natural = C.Clave;')
    .then((response) => {
        client.end();
        // res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        client.end();
    })
}

const getAllVentasClientesJuridicos = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    client.connect();
    client.query('SELECT V.Clave as Clave, V.Total as Total, V.Fecha as Fecha, C.nombre as Nombre FROM MU_VENTA V, MU_CLIENTE_JURIDICO C WHERE V.fk_cliente_juridico IS NOT NULL AND V.fk_cliente_juridico = C.Clave;')
    .then((response) => {
        client.end();
        // res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        client.end();
    })
}

const getFkClienteNaturalEnVentaById = (claveVenta, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
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
        console.log(error);
        client.end();
    })
}

const getFkClienteJuridicoEnVentaById = (claveVenta, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
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
        console.log(error);
        client.end();
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
    })
}

module.exports = {
    createVentaClienteNatural,
    createVentaClienteJuridico,
    getAllVentasClientesNaturales,
    getAllVentasClientesJuridicos,
    getFkClienteJuridicoEnVentaById,
    getFkClienteNaturalEnVentaById,
    getVentaById,
    deleteVentaById
    // ,[siguientes funciones]
}