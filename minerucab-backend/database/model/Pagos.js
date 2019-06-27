require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

// FORMATO  CONNECTION STRING postgressql://YourUserName:YourPassword@localhost:5432/YourDatabase

/* ------------------------------ CREATE ------------------------------ */

const createPagoCheque = (monto, fk_venta, fk_tipo_pago_cheque) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO mu_pago (monto, fk_venta, fk_tipo_pago_cheque) VALUES ($1, $2, $3)';
    const values = [monto, fk_venta, fk_tipo_pago_cheque];
    client.query(text, values)
    .then((res) => {
        client.end();
        // return res.rows[0].clave;
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
        res.status(500).json({ error: e.toString() });
    })
    
}

const createPagoTC = (monto, fk_venta, fk_tipo_pago_tarjeta_credito) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO mu_pago (monto, fk_venta, fk_tipo_pago_tarjeta_credito) VALUES ($1, $2, $3)';
    const values = [monto, fk_venta, fk_tipo_pago_tarjeta_credito];
    client.query(text, values)
    .then((res) => {
        client.end();
        // return res.rows[0].clave;
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
        res.status(500).json({ error: e.toString() });
    })
    
}

const createPagoTD = (monto, fk_venta, fk_tipo_pago_tarjeta_debito) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO mu_pago (monto, fk_venta, fk_tipo_pago_tarjeta_debito) VALUES ($1, $2, $3)';
    const values = [monto, fk_venta, fk_tipo_pago_tarjeta_debito];
    client.query(text, values)
    .then((res) => {
        client.end();
        // return res.rows[0].clave;
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
        res.status(500).json({ error: e.toString() });
    })
    
}

const createPagoTransferencia = (monto, fk_venta, fk_tipo_pago_transferencia) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO mu_pago (monto, fk_venta, fk_tipo_pago_transferencia) VALUES ($1, $2, $3)';
    const values = [monto, fk_venta, fk_tipo_pago_transferencia];
    client.query(text, values)
    .then((res) => {
        client.end();
        // return res.rows[0].clave;
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
        res.status(500).json({ error: e.toString() });
    })
    
}

const getPagosChequeByIdDeVenta = (claveVenta, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'SELECT PA.Monto as Monto, TP.Banco as Banco, TP.Numero_cheque as numero_cheque, TP.numero_cuenta as numero_cuenta FROM MU_PAGO as PA, MU_TIPO_PAGO_CHEQUE as TP WHERE PA.fk_venta = ($1) AND PA.fk_tipo_pago_cheque = TP.clave;';
    const values = [claveVenta];
    client.query(text, values)
    .then((res) => {
        client.end();
        callback(res)
        // return res.rows[0].clave;
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
        // res.status(500).json({ error: e.toString() });
    })
}

const getPagosTarjetaCreditoByIdDeVenta = (claveVenta, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'SELECT PA.Monto as Monto, TP.Banco as Banco, TP.Numero_tarjeta as numero_tarjeta, TP.Tipo as tipo FROM MU_PAGO as PA, MU_TIPO_PAGO_TARJETA_CREDITO as TP WHERE PA.fk_venta = ($1) AND PA.fk_tipo_pago_tarjeta_credito = TP.clave;';
    const values = [claveVenta];
    client.query(text, values)
    .then((res) => {
        client.end();
        callback(res)
        // return res.rows[0].clave;
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
        // res.status(500).json({ error: e.toString() });
    })
}

const getPagosTarjetaDebitoByIdDeVenta = (claveVenta, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'SELECT PA.Monto as Monto, TP.Banco as Banco, TP.Numero_tarjeta as numero_tarjeta FROM MU_PAGO as PA, MU_TIPO_PAGO_TARJETA_DEBITO as TP WHERE PA.fk_venta = ($1) AND PA.fk_tipo_pago_tarjeta_debito = TP.clave;';
    const values = [claveVenta];
    client.query(text, values)
    .then((res) => {
        client.end();
        callback(res)
        // return res.rows[0].clave;
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
        // res.status(500).json({ error: e.toString() });
    })
}

const getPagosTransferenciaByIdDeVenta = (claveVenta, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'SELECT PA.Monto as Monto, TP.Banco as Banco, TP.Numero_referencia as numero_referencia, TP.Numero_cuenta as numero_cuenta FROM MU_PAGO as PA, MU_TIPO_PAGO_TRANSFERENCIA as TP WHERE PA.fk_venta = ($1) AND PA.fk_tipo_pago_transferencia = TP.clave;';
    const values = [claveVenta];
    client.query(text, values)
    .then((res) => {
        client.end();
        callback(res)
        // return res.rows[0].clave;
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
        // res.status(500).json({ error: e.toString() });
    })
}

module.exports = {
    createPagoCheque,
    createPagoTC,
    createPagoTD,
    createPagoTransferencia,
    getPagosChequeByIdDeVenta,
    getPagosTarjetaCreditoByIdDeVenta,
    getPagosTarjetaDebitoByIdDeVenta,
    getPagosTransferenciaByIdDeVenta
}