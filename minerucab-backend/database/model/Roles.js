require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');
const format = require('pg-format');

const createRol = (info, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO mu_rol(nombre) VALUES ($1) RETURNING Clave;';
    const values = [info.nombre];
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

const createPrivilegiosRol = (values) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = format('INSERT INTO mu_rol_privilegio (fk_rol, fk_privilegio) VALUES %L', values);
    client.query(text)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    }) 
}

const getAllRoles = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    client.query('SELECT * FROM mu_rol;')
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

const getRolByIdEmpleado = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT R.clave as clave, R.nombre as nombre FROM mu_rol R, mu_empleado E, mu_usuario U WHERE U.fk_empleado=E.clave AND U.fk_rol=R.clave and E.clave = ($1);';
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

const getRolById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT nombre FROM mu_rol WHERE clave = ($1);';
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

const updateRolById = (info) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'UPDATE MU_ROL SET nombre=($1) WHERE clave=($2);';
    const values = [info.nombre, info.clave];
    client.query(text, values)
    .then((response) => {
        client.end();
    })
    .catch((error) => {
        console.log(error);
        client.end();
    })
}

const deletePrivilegiosRol = (relacion, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'DELETE FROM MU_ROL_PRIVILEGIO WHERE clave = ($1);';
    const values = [relacion];
    client.query(text, values)
    .then((response) => {
        client.end();
    })
    .catch((error) => {
        console.log(error);
        client.end();
    })
}

const deleteRolById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  
    });
    client.connect();
    const text = 'DELETE FROM mu_rol WHERE clave = ($1);';
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
    createRol,
    createPrivilegiosRol,
    getAllRoles,
    getRolById,
    getRolByIdEmpleado,
    updateRolById,
    deletePrivilegiosRol,
    deleteRolById,
    // ,[siguientes funciones]
}