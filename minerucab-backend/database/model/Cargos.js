require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

const getAllCargos = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    client.query('SELECT * FROM mu_cargo;')
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

const getCargoByIdEmpleado = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT C.clave as clave, C.nombre as nombre FROM mu_cargo C, mu_empleado E WHERE C.clave=E.fk_cargo AND E.clave = ($1);';
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

const getCargosByIdFase = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT CF.Clave clave_cargo_fase, CF.Cantidad cantidad, CF.sueldo sueldo, C.Clave clave, C.Nombre nombre FROM MU_CARGO_FASE CF, MU_CARGO C WHERE CF.fk_fase = ($1) AND CF.fk_cargo = C.Clave;';
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


const getNumeroEmpleadosCargoByIdFaseIdCargo = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT COUNT(ECF.clave) asignaciones FROM MU_FASE F, MU_CARGO_FASE CF, MU_EMPLEADO_CARGO_FASE ECF, MU_EMPLEADO E, MU_CARGO C WHERE F.clave = CF.fk_fase AND CF.clave=ECF.fk_cargo_fase AND ECF.fk_empleado = E.clave AND C.clave=CF.fk_cargo AND F.clave = ($1) AND C.clave = ($2);';
    const values = [req.params.id_fase,req.params.id_cargo];
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
    getAllCargos,
    getCargoByIdEmpleado,
    getCargosByIdFase,
    getNumeroEmpleadosCargoByIdFaseIdCargo
    // ,[siguientes funciones]
}