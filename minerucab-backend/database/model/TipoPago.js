require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');
const format = require('pg-format');

// FORMATO  CONNECTION STRING postgressql://YourUserName:YourPassword@localhost:5432/YourDatabase

/* ------------------------------ CREATE ------------------------------ */

const createTipoPagoCheque = (values, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    console.log('values', values)
    client.connect();
    const text = format('INSERT INTO mu_tipo_pago_cheque (Banco, Numero_cheque, Numero_cuenta) VALUES %L RETURNING Clave', values);
    console.log('text', text)
    client.query(text)
    .then((res) => {
        callback(res.rows[0].clave)
        client.end();
        // return res.rows[0].clave;
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    })
    
}

const createTipoPagoTC = (values, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    console.log('values', values)
    client.connect();
    const text = format('INSERT INTO mu_tipo_pago_tarjeta_credito (Banco, Numero_tarjeta, Tipo) VALUES %L RETURNING Clave', values);
    client.query(text)
    .then((res) => {
        callback(res.rows[0].clave)
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    })
    
}

const createTipoPagoTD = (values, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = format('INSERT INTO mu_tipo_pago_tarjeta_debito (Banco, Numero_tarjeta) VALUES %L RETURNING Clave', values);
    client.query(text)
    .then((res) => {
        client.end();
        callback(res.rows[0].clave)
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    })
    
}

const createTipoPagoTransferencia = (values, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = format('INSERT INTO mu_tipo_pago_transferencia (Banco, Numero_referencia, Numero_cuenta) VALUES %L RETURNING Clave', values);
    client.query(text)
    .then((res) => {
        callback(res.rows[0].clave)
        client.end();
        // return res.rows[0].clave;
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
        // res.status(500).json({ error: e.toString() });
    })
    
}

module.exports = {
    createTipoPagoCheque,
    createTipoPagoTC,
    createTipoPagoTD,
    createTipoPagoTransferencia
    // ,[siguientes funciones]
}