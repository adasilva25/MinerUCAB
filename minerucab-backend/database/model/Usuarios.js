require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');

/* ------------------------------ LOGIN ------------------------------ */

const validateUser = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    client.connect();
    const text = 'SELECT U.Clave as "user_clave", R.Clave as "clave_rol", R.Nombre, E.P_nombre, E.P_apellido, PR.Nombre, PR.Clave as "clave_privilegio", PR.Tipo as "tipo_privilegio", RP.Clave as "rol_privilegio_clave" FROM MU_USUARIO U, MU_ROL R, MU_ROL_PRIVILEGIO RP, MU_PRIVILEGIO PR, MU_EMPLEADO E WHERE U.Usuario = ($1) AND U.contraseña = ($2) AND U.fk_rol = R.Clave AND R.Clave = RP.fk_rol AND RP.fk_privilegio = PR.Clave AND U.fk_empleado = E.Clave;';
    const values = [req.body.data.user, req.body.data.password];
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

/* ------------------------------ CREATE ------------------------------ */

const createUsuario = (claveEmpleado, info) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO mu_usuario (usuario, contraseña, fk_empleado, fk_rol, fk_estatus)\n\
                    VALUES ($1, $2, $3, $4, $5)';
    const values = [info.usuario, info.contrasena, claveEmpleado, info.fk_rol, 1];
    client.query(text, values)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    })
}

const insertUsuario = (req, res, next) => {
    const info = req.body.data;
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO mu_usuario (usuario, contraseña, fk_empleado, fk_rol, fk_estatus)\n\
                    VALUES ($1, $2, $3, $4, $5)';
    const values = [info.usuario, info.contrasena, info.empleadoid, info.fk_rol, 1];
    client.query(text, values)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    })
}

const updateUsuarioById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    console.log(req.body.data)
    client.connect();
    const text = 'UPDATE MU_USUARIO SET usuario=($1), "contraseña"=($2), fk_empleado=($3), fk_rol=($4) WHERE Clave = ($5);';
    const values = [req.body.data.usuario, req.body.data.contrasena, req.body.data.empleadoid, req.body.data.fk_rol, req.body.data.claveusuario];
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

/* ------------------------------ READ ------------------------------ */

const getUsuarioById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING 
    });
    client.connect();
    const text = 'SELECT U.clave as clave, U.usuario as usuario, U.contraseña as contrasena FROM mu_usuario U WHERE U.fk_empleado = ($1);';
    const values = [req.params.id];
    client.query(text, values)
    .then((response) => {
        console.log('Completed!', response.rows[0])
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        client.end();
        res.status(500).json({ error: error.toString() });
    })
}

const deleteUsuarioById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'DELETE FROM MU_USUARIO WHERE clave = ($1);';
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
    createUsuario,
    insertUsuario,
    getUsuarioById,
    updateUsuarioById,
    validateUser,
    deleteUsuarioById,
    // ,[siguientes funciones]
}