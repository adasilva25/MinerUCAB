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

const getEmpleadosByIdCargo = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  
    });
    client.connect();
    const text = 'SELECT E.Clave "Clave", E.p_nombre "Nombre", E.p_apellido "Apellido", E.ci "Cédula", E.sexo "Sexo" FROM mu_empleado E, MU_CARGO C WHERE C.clave = ($1) AND C.Clave = E.fk_cargo AND E.fk_estatus = 1;';
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

const getEmpleadosByIdCargoFase = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  
    });
    client.connect();
    const text = 'SELECT E.Clave clave, E.CI ci, E.p_nombre nombre, E.p_apellido apellido, E.Sexo sexo, ES.Nombre estatus, ECF.Clave clave_empleado_cargo_fase FROM MU_EMPLEADO E, MU_ESTATUS ES, MU_EMPLEADO_CARGO_FASE ECF WHERE ECF.fk_cargo_fase = ($1) AND E.Clave = ECF.fk_empleado AND ECF.fk_estatus = ES.Clave';
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

const getHorarioEmpleadoByIdEmpleadoCargoFase = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  
    });
    client.connect();
    const text = '	SELECT H.Clave clave_horario, H.Dia dia, H.hora_entrada hora_entrada, H.hora_salida hora_salida FROM MU_HORARIO H, MU_HORARIO_EMPLEADO HE WHERE HE.fk_empleado_cargo_fase = ($1) AND HE.fk_horario = H.Clave;';
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
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  
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
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  
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

const updateEstatusEmpleadoById = (idEmpleado, estatus) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  
    });
    client.connect();
    const text = 'UPDATE MU_EMPLEADO SET fk_estatus = ($2) WHERE Clave = ($1);';
    const values = [idEmpleado, estatus];
    client.query(text, values)
    .then((response) => {
        client.end();
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
    getEmpleadosByIdCargo,
    getEmpleadosByIdCargoFase,
    getHorarioEmpleadoByIdEmpleadoCargoFase,
    updateEmpleadoById,
    updateEstatusEmpleadoById,
    deleteEmpleadoById
    // ,[siguientes funciones]
}