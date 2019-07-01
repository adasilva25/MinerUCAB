require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');
const format = require('pg-format');

/* ------------------------------ CREATE ------------------------------ */

const createExplotacion = (info, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO MU_EXPLOTACION (costo_total, duracion, fecha_inicio, fecha_fin, fk_venta, fk_estatus)\n\
                    VALUES ($1, $2, null, null, null, $3) RETURNING Clave';
    const values = [info.explotacion.costo, info.explotacion.duracion, info.explotacion.estatus];
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

const createEtapa = (info, claveExplotacion, num, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO MU_ETAPA (nombre, costo_total, duracion, fecha_inicio, fecha_fin, fecha_fin_real, fk_estatus, fk_explotacion)\n\
                    VALUES ($1, $2, $3, null, null, null, $4, $5) RETURNING Clave';
    const values = [info.etapas[num].nombre, info.etapas[num].costo, info.etapas[num].duracion, info.etapas[num].estatus, claveExplotacion];
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

const createFase = (info, claveEtapa, numE, numF, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO MU_FASE (nombre, costo, duracion, fecha_inicio, fecha_fin, fecha_fin_real, fk_estatus, fk_etapa)\n\
                    VALUES ($1, $2, $3, null, null, null, $4, $5) RETURNING Clave';
    const values = [info.etapas[numE].fases[numF].nombre, info.etapas[numE].fases[numF].costo, info.etapas[numE].fases[numF].duracion, info.etapas[numE].fases[numF].estatus, claveEtapa];
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

const createCargoFase = (values) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = format('INSERT INTO MU_CARGO_FASE (cantidad, sueldo, fk_cargo, fk_fase) VALUES %L', values);
    client.query(text)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    }) 
}

const createTipoMaquinariaFase = (values) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = format('INSERT INTO MU_TIPO_MAQUINARIA_FASE (cantidad, costo, fk_fase, fk_tipo_maquinaria) VALUES %L', values);
    client.query(text)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    }) 
}


/* ------------------------------ READ ------------------------------ */

const getEtapasByIdExplotacion = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'SELECT E.Clave clave, E.nombre nombre, E.costo_total costo_total, E.Fecha_inicio fecha_inicio, E.fecha_fin fecha_fin, E.fecha_fin_real fecha_fin_real, E.duracion duracion, ES.Nombre estatus FROM MU_ETAPA E, MU_ESTATUS ES WHERE E.fk_explotacion = ($1) AND E.fk_estatus = ES.Clave';
    const values = [req.params.id];
    client.query(text, values)
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })

    .catch((e) => {
        client.end();
        console.error(e.stack);

    })
}

const getFasesByIdEtapa = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'SELECT * FROM MU_FASE WHERE fk_etapa = ($1)';

    const values = [req.params.id];
    client.query(text, values)
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })

    .catch((e) => {
        client.end();
        console.error(e.stack);

    })
}

const getCargosExpByIdFase = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'select c.clave as clave, c.nombre as nombre, cf.sueldo as sueldo, cf.cantidad as cantidad, cf.clave as relacion from mu_cargo_fase cf, mu_cargo c\n\
                    where cf.fk_cargo=c.clave and fk_fase = ($1);';

    const values = [req.params.id];
    client.query(text, values)
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })

    .catch((e) => {
        client.end();
        console.error(e.stack);

    })
}

const getAllExplotacionesFkVentaConEstatusDiferenteAInactivo = (callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'SELECT EX.fk_venta FROM MU_EXPLOTACION EX, MU_ESTATUS E WHERE E.Nombre != ($1);'
    const values = ['Inactivo'];
    client.query(text, values)
    .then((response) => {
        client.end();
        callback(response.rows)
    })
    .catch((e) => {
        client.end();
        console.error(e.stack);
    })
}

const getEmpleadosByIdCargoFase = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'select e.clave, e.p_nombre, e.p_apellido, e.ci, e.sexo, ecf.clave as relacion from mu_cargo_fase cf, mu_empleado e, mu_empleado_cargo_fase ecf\n\
                    where cf.clave=ecf.fk_cargo_fase and e.clave=ecf.fk_empleado and cf.clave = ($1)';

    const values = [req.params.id];
    client.query(text, values)
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })

    .catch((e) => {
        client.end();
        console.error(e.stack);

    })
}

const getExplotacionById = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'SELECT * FROM MU_EXPLOTACION WHERE clave = ($1)';

    const values = [req.params.id];
    client.query(text, values)
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })

    .catch((e) => {
        client.end();
        console.error(e.stack);

    })
}


const getAllExplotaciones = (req, res) => {

    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();

    client.query('SELECT EX.Clave, EX.costo_total "Costo", EX.fecha_inicio "Fecha inicio", E.nombre estatus FROM MU_EXPLOTACION EX, MU_ESTATUS E WHERE EX.fk_estatus = E.Clave;')

    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })

    .catch((e) => {
        client.end();
        console.error(e.stack);
    })
}


module.exports = {
    createExplotacion,
    createEtapa,
    createFase,
    createCargoFase,
    createTipoMaquinariaFase,
    getAllExplotacionesFkVentaConEstatusDiferenteAInactivo,
    getEtapasByIdExplotacion,
    getFasesByIdEtapa,
    getCargosExpByIdFase,
    getEmpleadosByIdCargoFase,
    getExplotacionById,


    getAllExplotaciones,


    // ,[siguientes funciones]
}