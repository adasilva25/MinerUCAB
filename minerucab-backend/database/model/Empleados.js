require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

// FORMATO  CONNECTION STRING postgressql://YourUserName:YourPassword@localhost:5432/YourDatabase

/* ------------------------------ CREATE ------------------------------ */

const createEmpleado = (info, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO mu_empleado (ci, p_nombre, s_nombre, p_apellido, s_apellido, fecha_nacimiento, sexo, nivel_de_instruccion, telefono, fk_lugar, fk_cargo, fk_estatus)\n\
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING Clave';
    const values = [info.ci, info.pnombre, info.snombre, info.papellido, info.sapellido, info.fecha_nacimiento, info.sexo, info.nivel, info.telefono, info.fk_lugar, info.fk_cargo, info.fk_estatus];
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

const getAllEmpleados = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    client.connect();

    //client.query('SELECT * FROM test_table;')

    client.query('SELECT * FROM mu_empleado;')
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

const getCriticInfoEmpleados = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    client.connect();
    client.query('SELECT clave as clave, ci as Cedula, p_nombre as Nombre, p_apellido as Apellido FROM mu_empleado;')
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

const getEmpleadoByCedula = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT * FROM mu_empleado WHERE ci = ($1);';
    const values = [req.params.cedula];
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

const getEmpleadoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT * FROM mu_empleado WHERE clave = ($1);';
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

const deleteEmpleadoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'DELETE FROM mu_empleado WHERE clave = ($1);';
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

const updateEmpleadoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    console.log(req.body.data)
    client.connect();
    const text = 'UPDATE MU_EMPLEADO SET ci=($1), p_nombre=($2), s_nombre=($3), p_apellido=($4), s_apellido=($5),\n\
                    fecha_nacimiento=($6), sexo=($7), nivel_de_instruccion=($8), telefono=($9), fk_lugar=($10), fk_cargo=($11),\n\
                    fk_estatus=($12) WHERE Clave = ($13);';
    const values = [req.body.data.ci, req.body.data.pnombre, req.body.data.snombre, req.body.data.papellido, req.body.data.sapellido, req.body.data.fecha_nacimiento, req.body.data.sexo, req.body.data.nivel, req.body.data.telefono, req.body.data.fk_lugar, req.body.data.fk_cargo, req.body.data.fk_estatus, req.body.data.empleadoid];
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

module.exports = {
    createEmpleado,
    getAllEmpleados,
    getCriticInfoEmpleados,
    getEmpleadoByCedula,
    getEmpleadoById,
    updateEmpleadoById,
    deleteEmpleadoById
    // ,[siguientes funciones]
}