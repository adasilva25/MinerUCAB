require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');
const format = require('pg-format');

// FORMATO  CONNECTION STRING postgressql://YourUserName:YourPassword@localhost:5432/YourDatabase

/* ------------------------------ CREATE ------------------------------ */

const createDetalleVenta = (values) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    console.log('dv')
    console.log('values', values)
    client.connect();
    const text = format('INSERT INTO mu_detalle_venta (Cantidad, Precio, fk_venta, fk_estatus, fk_presentacion_mineral) VALUES %L', values);
    client.query(text)
    .then((res) => {
        client.end();
        // return res.rows[0].clave;
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
        res.status(500).json({ error: error.toString() });
    }) 
}

const getDetalleVentaByIdVenta = (req, response) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'SELECT Clave, Cantidad, Precio, fk_estatus, fk_presentacion_mineral FROM mu_detalle_venta WHERE fk_venta = ($1);';
    const values = [req.params.id];
    client.query(text, values)
    .then((res) => {
        client.end();
        response.status(200).json(res.rows)
        // return res.rows[0].clave;
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
        res.status(500).json({ error: error.toString() });
    }) 
}

module.exports = {
    createDetalleVenta,
    getDetalleVentaByIdVenta
    // ,[siguientes funciones]
}