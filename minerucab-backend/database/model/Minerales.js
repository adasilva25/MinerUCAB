require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');
const format = require('pg-format');

/* ------------------------------ CREATE ------------------------------ */

const createMineralMetalico = (info, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO mu_mineral_metalico(nombre, descripcion, dureza) VALUES ($1, $2, $3) RETURNING Clave';
    const values = [info.nombre, info.descripcion, info.dureza];
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

const createMineralNoMetalico = (info, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO mu_mineral_no_metalico(nombre, descripcion, uso) VALUES ($1, $2, $3) RETURNING Clave';
    const values = [info.nombre, info.descripcion, info.uso];
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

const createPresentacionMineralMet = (values) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = format('INSERT INTO mu_presentacion_mineral (precio, fk_presentacion, fk_mineral_metalico) VALUES %L', values);
    client.query(text)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    }) 
}

const createPresentacionMineralNoMet = (values) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = format('INSERT INTO mu_presentacion_mineral (precio, fk_presentacion, fk_mineral_no_metalico) VALUES %L', values);
    client.query(text)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    }) 
}

const createComponenteMineralMet = (values) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = format('INSERT INTO mu_mineral_mineral (porcentaje, fk_mineral_metalico_compuesto, fk_mineral_metalico_compone) VALUES %L', values);
    client.query(text)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    }) 
}

const createComponenteMineralNoMet = (values) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = format('INSERT INTO mu_mineral_mineral (porcentaje, fk_mineral_no_metalico_compuesto, fk_mineral_no_metalico_compone) VALUES %L', values);
    client.query(text)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    }) 
}

/* ------------------------------ SELECT ------------------------------ */

const getAllMineralesMetalicos = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    client.query('SELECT * FROM mu_mineral_metalico; ')
    .then((response) => {
        console.log('Completed!', response.rows[0])
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        client.end();
    })
}

const getAllMineralesNoMetalicos = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    client.query('SELECT * FROM mu_mineral_no_metalico; ')
    .then((response) => {
        console.log('Completed!', response.rows[0])
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        client.end();
    })
}

const getAllMineralesMetalicosConPresentacion = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    client.query('SELECT A.Clave, M.nombre as mineral, P.nombre as presentacion, A.precio as precio FROM mu_mineral_metalico M, mu_presentacion P, mu_presentacion_mineral A WHERE M.clave = A.fk_mineral_metalico and P.clave = A.fk_presentacion;')
    .then((response) => {
        console.log('Completed!', response.rows[0])
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        client.end();
    })
}

const getAllMineralesNoMetalicosConPresentacion = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    client.query('SELECT A.Clave, M.nombre as mineral, P.nombre as presentacion, A.precio as precio FROM mu_mineral_no_metalico M, mu_presentacion P, mu_presentacion_mineral A WHERE M.clave = A.fk_mineral_no_metalico and P.clave = A.fk_presentacion;')
    .then((response) => {
        console.log(response)
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((error) => {
        console.log(error);
        client.end();
    })
}

const getMineralMetalicoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT * FROM mu_mineral_metalico WHERE clave = ($1);';
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

const getMineralNoMetalicoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT * FROM mu_mineral_no_metalico WHERE clave = ($1);';
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

const getNombreMineralMetalicoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT nombre FROM mu_mineral_metalico WHERE clave = ($1);';
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

const getNombreMineralNoMetalicoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'SELECT nombre FROM mu_mineral_no_metalico WHERE clave = ($1);';
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

const getAllComponentesByIdMineralMetalico = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'select c.clave as clave, c.nombre as nombre, a.porcentaje as porcentaje from mu_mineral_mineral a, mu_mineral_metalico m, mu_mineral_metalico c where a.fk_mineral_metalico_compone=c.clave and a.fk_mineral_metalico_compuesto=m.clave and m.clave = ($1);';
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

const getAllComponentesByIdMineralNoMetalico = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'select c.clave as clave, c.nombre as nombre, a.porcentaje as porcentaje from mu_mineral_mineral a, mu_mineral_no_metalico m, mu_mineral_no_metalico c where a.fk_mineral_no_metalico_compone=c.clave and a.fk_mineral_no_metalico_compuesto=m.clave and m.clave = ($1);';
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

/* ------------------------------ DELETE ------------------------------ */

const deleteMineralMetalicoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'DELETE FROM mu_mineral_metalico WHERE clave = ($1);';
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

const deleteMineralNoMetalicoById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'DELETE FROM mu_mineral_no_metalico WHERE clave = ($1);';
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
    createMineralMetalico,
    createMineralNoMetalico,
    createPresentacionMineralMet,
    createPresentacionMineralNoMet,
    createComponenteMineralMet,
    createComponenteMineralNoMet,
    getAllMineralesMetalicos,
    getAllMineralesNoMetalicos,
    getAllMineralesMetalicosConPresentacion,
    getAllMineralesNoMetalicosConPresentacion,
    getMineralMetalicoById,
    getMineralNoMetalicoById,
    getNombreMineralMetalicoById,
    getNombreMineralNoMetalicoById,
    getAllComponentesByIdMineralMetalico,
    getAllComponentesByIdMineralNoMetalico,
    deleteMineralMetalicoById,
    deleteMineralNoMetalicoById
    // ,[siguientes funciones]
}