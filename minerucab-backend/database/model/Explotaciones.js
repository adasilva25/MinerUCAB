require('dotenv').config({ path: '.env.development' });
const { Client } = require('pg');
const format = require('pg-format');

/* ------------------------------ CREATE ------------------------------ */

const insertIntoMaquinariaTipoMaquinariaFase = (claveTipoMaquinariaFase, fk_maquinaria) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO MU_MAQUINARIA_TIPO_MAQUINARIA_FASE (fk_tipo_maquinaria_fase, fk_maquinaria) VALUES ($1, $2)';
    const values = [claveTipoMaquinariaFase, fk_maquinaria];
    client.query(text, values)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    })
}

const insertHorarioEmpleado = (claveEmpleadoCargoFase, pk_horario) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO MU_HORARIO_EMPLEADO (fk_empleado_cargo_fase, fk_horario) VALUES ($1, $2);';
    const values = [claveEmpleadoCargoFase, pk_horario];
    client.query(text, values)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    })
}

const insertIntoEmpleadoCargoFase = (claveCargoFase, fk_empleado, fk_estatus, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO MU_EMPLEADO_CARGO_FASE (fk_cargo_fase, fk_empleado, fk_estatus) VALUES ($1, $2, $3) RETURNING Clave;';
    const values = [claveCargoFase, fk_empleado, fk_estatus];
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

const insertFechasFases = (fechaI, fechaF, estatus, clave) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'UPDATE MU_FASE SET fecha_inicio = ($1), fecha_fin = ($2), fk_estatus = ($3) WHERE Clave = ($4);';
    const values = [fechaI, fechaF, estatus, clave];
    client.query(text, values)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    })
}

const insertFechasEtapas = (fechaI, fechaF, estatus, clave) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'UPDATE MU_ETAPA SET fecha_inicio = ($1), fecha_fin = ($2), fk_estatus = ($3) WHERE Clave = ($4)';
    const values = [fechaI, fechaF, estatus, clave];
    client.query(text, values)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    })
}

const insertFechas = (fechaI, fechaF, estatus, clave) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'UPDATE MU_EXPLOTACION SET fecha_inicio = ($1), fecha_fin = ($2), fk_estatus = ($3) WHERE Clave = ($4)';
    const values = [fechaI, fechaF, estatus, clave];
    client.query(text, values)
    .then((res) => {
        client.end();
    })
    .catch((e) => {
        console.error(e.stack);
        client.end();
    })
}

const createExplotacion = (info, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO MU_EXPLOTACION (costo_total, duracion, fecha_inicio, fecha_fin, fk_venta, fk_estatus)\n\
                    VALUES ($1, $2, null, null, null, $3) RETURNING Clave';
    const values = [info.explotacion.costo, info.explotacion.duracion, 2];
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

const getClaveTipoMaquinariaFase = (faseId, tipoMaquinariaId, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'SELECT TMF.Clave FROM MU_TIPO_MAQUINARIA_FASE MTF WHERE TMF.fk_fase = ($1) AND TMF.fk_tipo_maquinaria = ($2);';
    const values = [faseId, tipoMaquinariaId];
    client.query(text, values)
    .then((response) => {
        client.end();
        callback(response.rows[0].clave);
    })

    .catch((e) => {
        client.end();
        console.error(e.stack);

    })
}
const getClaveCargoFaseByCargoClaveYFaseClave = (faseId, cargoId, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'SELECT CF.Clave FROM MU_CARGO_FASE CF WHERE CF.fk_cargo = ($2) AND CF.fk_fase = ($1);';
    const values = [faseId, cargoId];
    client.query(text, values)
    .then((response) => {
        client.end();
        console.log('response', response)
        callback(response.rows[0].clave);
    })

    .catch((e) => {
        client.end();
        console.error(e.stack);

    })
}

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
    client.query('SELECT EX.Clave, Y.nombre as Yacimiento, EX.costo_total "Costo", EX.fecha_inicio "Fecha inicio", E.nombre estatus FROM MU_EXPLOTACION EX, MU_ESTATUS E, MU_YACIMIENTO Y WHERE Y.fk_explotacion=EX.clave AND EX.fk_estatus = E.Clave;')
    .then((response) => {
        client.end();
        res.status(200).json(response.rows)
    })
    .catch((e) => {
        client.end();
        console.error(e.stack);
    })
}

const updateEstatus = (fk_estatus) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'UPDATE MU_YACIMIENTO SET fk_estatus = ($1);';
    const values = [fk_estatus];
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
    getClaveCargoFaseByCargoClaveYFaseClave,
    getClaveTipoMaquinariaFase,
    insertFechas,
    insertFechasEtapas,
    insertFechasFases,
    insertHorarioEmpleado,
    insertIntoEmpleadoCargoFase,
    insertIntoMaquinariaTipoMaquinariaFase,
    updateEstatus
    // ,[siguientes funciones]
}