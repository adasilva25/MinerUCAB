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
        res.status(500).json({ error: error.toString() });
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
        res.status(500).json({ error: error.toString() });
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
        res.status(500).json({ error: error.toString() });
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
        res.status(500).json({ error: error.toString() });
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
        res.status(500).json({ error: error.toString() });
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
        res.status(500).json({ error: error.toString() });
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
        res.status(500).json({ error: error.toString() });
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
        res.status(500).json({ error: error.toString() });
    })
}

const getAllComponentesByIdMineralMetalico = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'select c.clave as clave, c.nombre as nombre, a.porcentaje as porcentaje, a.clave as relacion from mu_mineral_mineral a, mu_mineral_metalico m, mu_mineral_metalico c where a.fk_mineral_metalico_compone=c.clave and a.fk_mineral_metalico_compuesto=m.clave and m.clave = ($1);';
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

const getAllComponentesByIdMineralNoMetalico = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'select c.clave as clave, c.nombre as nombre, a.porcentaje as porcentaje, a.clave as relacion from mu_mineral_mineral a, mu_mineral_no_metalico m, mu_mineral_no_metalico c where a.fk_mineral_no_metalico_compone=c.clave and a.fk_mineral_no_metalico_compuesto=m.clave and m.clave = ($1);';
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
        res.status(500).json({ error: error.toString() });
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
        res.status(500).json({ error: error.toString() });
    })
}

const updateMinMetById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    console.log(req.body.data)
    client.connect();
    const text = 'UPDATE MU_MINERAL_METALICO SET nombre=($1), descripcion=($2), dureza=($3) WHERE clave=($4);';
    const values = [req.body.data.nombre, req.body.data.descripcion, req.body.data.dureza, req.body.data.mineralid];
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

const updateMinNoMetById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    console.log(req.body.data)
    client.connect();
    const text = 'UPDATE MU_MINERAL_NO_METALICO SET nombre=($1), descripcion=($2), uso=($3) WHERE clave=($4);';
    const values = [req.body.data.nombre, req.body.data.descripcion, req.body.data.uso, req.body.data.mineralid];
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

const updatePresMinMet = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    console.log(req.body.data)
    client.connect();
    const text = 'UPDATE MU_PRESENTACION_MINERAL SET precio=($1), fk_presentacion=($2), fk_mineral_metalico=($3),\n\
                    fk_mineral_no_metalico=null WHERE clave=($4);';
    const values = [req.body.data.precio, req.body.data.idPresentacion, req.body.data.mineral, req.body.data.relacion];
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

const updatePresMinNoMet = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    console.log(req.body.data)
    client.connect();
    const text = 'UPDATE MU_PRESENTACION_MINERAL SET precio=($1), fk_presentacion=($2), fk_mineral_metalico=null,\n\
                    fk_mineral_no_metalico=($3) WHERE clave=($4);';
    const values = [req.body.data.precio, req.body.data.idPresentacion, req.body.data.mineral, req.body.data.relacion];
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

const updateCompMinMet = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    console.log(req.body.data)
    client.connect();
    const text = 'UPDATE MU_MINERAL_MINERAL SET porcentaje=($1), fk_mineral_metalico_compuesto=($2), fk_mineral_metalico_compone=($3),\n\
                    fk_mineral_no_metalico_compuesto=null, fk_mineral_no_metalico_compone=null WHERE clave=($4);';
    const values = [req.body.data.porcentaje, req.body.data.mineral, req.body.data.idComponente, req.body.data.relacion];
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

const updateCompMinNoMet = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    console.log(req.body.data)
    client.connect();
    const text = 'UPDATE MU_MINERAL_MINERAL SET porcentaje=($1), fk_mineral_metalico_compuesto=null, fk_mineral_metalico_compone=null,\n\
                    fk_mineral_no_metalico_compuesto=($2), fk_mineral_no_metalico_compone=($3) WHERE clave=($4);';
    const values = [req.body.data.porcentaje, req.body.data.mineral, req.body.data.idComponente, req.body.data.relacion];
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

const insertPresMinMet = (req, res, next) => {
    const info = req.body.data;
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO MU_PRESENTACION_MINERAL (precio, fk_presentacion, fk_mineral_metalico, fk_mineral_no_metalico)\n\
                    VALUES ($1, $2, $3, null);';
    const values = [info.precio, info.idPresentacion, info.mineral];
    client.query(text, values)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    })
}

const insertPresMinNoMet = (req, res, next) => {
    const info = req.body.data;
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO MU_PRESENTACION_MINERAL (precio, fk_presentacion, fk_mineral_metalico, fk_mineral_no_metalico)\n\
                    VALUES ($1, $2, null, $3);';
    const values = [info.precio, info.idPresentacion, info.mineral];
    client.query(text, values)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    })
}

const insertCompMinMet = (req, res, next) => {
    const info = req.body.data;
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO MU_MINERAL_MINERAL (porcentaje, fk_mineral_metalico_compuesto, fk_mineral_metalico_compone,\n\
                    fk_mineral_no_metalico_compuesto, fk_mineral_no_metalico_compone) VALUES ($1, $2, $3, null, null);';
    const values = [info.porcentaje, info.mineral, info.idComponente];
    client.query(text, values)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    })
}

const insertCompMinNoMet = (req, res, next) => {
    const info = req.body.data;
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO MU_MINERAL_MINERAL (porcentaje, fk_mineral_metalico_compuesto, fk_mineral_metalico_compone,\n\
                    fk_mineral_no_metalico_compuesto, fk_mineral_no_metalico_compone) VALUES ($1, null, null, $2, $3);';
    const values = [info.porcentaje, info.mineral, info.idComponente];
    client.query(text, values)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    })
}

const deletePresMin = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'DELETE FROM MU_PRESENTACION_MINERAL WHERE clave = ($1);';
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

const deleteCompMin = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING  // MASTER CONNECTION
    });
    client.connect();
    const text = 'DELETE FROM MU_MINERAL_MINERAL WHERE clave = ($1);';
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
    createMineralMetalico,
    createMineralNoMetalico,
    createPresentacionMineralMet,
    createPresentacionMineralNoMet,
    createComponenteMineralMet,
    createComponenteMineralNoMet,
    insertPresMinMet,
    insertPresMinNoMet,
    insertCompMinMet,
    insertCompMinNoMet,
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
    updateMinMetById,
    updateMinNoMetById,
    updatePresMinMet,
    updatePresMinNoMet,
    updateCompMinMet,
    updateCompMinNoMet,
    deleteMineralMetalicoById,
    deleteMineralNoMetalicoById,
    deletePresMin,
    deleteCompMin
    // ,[siguientes funciones]
}