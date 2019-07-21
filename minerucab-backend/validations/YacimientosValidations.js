const Explotaciones = require('../database/model/Explotaciones');
const Yacimientos = require('../database/model/Yacimientos');
const YacimientosMinerales = require('../database/model/YacimientoMineral');
const { Client } = require('pg');

const crearConfiguracionYacimiento = (req, res, next) => {
    const info = req.body.data;
    console.log(req.body.data)

    Explotaciones.createExplotacion(info, function(claveExplotacion){
        console.log("Explotacion", claveExplotacion)
        Yacimientos.createYacimiento(info, claveExplotacion, function(claveYacimiento){
            console.log("Yacimiento", claveYacimiento)
            Yacimientos.insertTipoYacimiento(info, claveYacimiento)
            if(info.minerales.length>0){
                insertYacimientoMinMet(claveYacimiento, info)
            }
            if(info.mineralesNoMetalicos.length>0){
                insertYacimientoMinNoMet(claveYacimiento, info)
            }
        })
        for(let i=0; i<info.etapas.length; i++){
            Explotaciones.createEtapa(info, claveExplotacion, i, function(claveEtapa){
                for(let j=0; j<info.etapas[i].fases.length; j++){
                    Explotaciones.createFase(info, claveEtapa, i, j, function(claveFase){
                        console.log("Etapa ", i, ":", claveEtapa, "Fase ", j, ":", claveFase)
                        insertCargoFase(claveFase, info, i, j)
                        if(info.etapas[i].fases[j].tipoMaquinaria[0].id>0){
                            insertTipoMaquinariaFase(claveFase, info, i, j)
                        }
                    })
                }
            })
        }
        res.status(200).json({operacion: 'exito'})
    })
}

const insertYacimientoMinMet = (claveYacimiento, info) => {
    let values = [];
    info.minerales.forEach(item => {
        let value = []
        value.push(item.total);
        value.push(item.id);
        value.push(null);
        value.push(claveYacimiento);
        // console.log(value)
        values.push(value);
    });
    // console.log(values)
    Yacimientos.createYacMineralMet(values)
}

const insertYacimientoMinNoMet = (claveYacimiento, info) => {
    let values = [];
    info.mineralesNoMetalicos.forEach(item => {
        let value = []
        value.push(item.total);
        value.push(null);
        value.push(item.id);
        value.push(claveYacimiento);
        // console.log(value)
        values.push(value);
    });
    // console.log(values)
    Yacimientos.createYacMineralNoMet(values)
}

const insertCargoFase = (claveFase, info, numE, numF) => {
    let values = [];
    info.etapas[numE].fases[numF].cargos.forEach(item => {
        let value = []
        value.push(item.cantidad);
        value.push(item.sueldo);
        value.push(item.id);
        value.push(claveFase);
        // console.log(value)
        values.push(value);
    });
    // console.log(values)
    Explotaciones.createCargoFase(values)
}

const insertTipoMaquinariaFase = (claveFase, info, numE, numF) => {
    let values = [];
    info.etapas[numE].fases[numF].tipoMaquinaria.forEach(item => {
        let value = []
        value.push(item.cantidad);
        value.push(item.costo);
        value.push(claveFase);
        value.push(item.id);
        // console.log(value)
        values.push(value);
    });
    // console.log(values)
    Explotaciones.createTipoMaquinariaFase(values)
}

const updateEtapas = (etapas, info) => {
    etapas.update.forEach((etapaUpdate) => {
        Yacimientos.updateEtapa(etapaUpdate)
        for(let i=0; i<etapaUpdate.fases.insert.length;i++){
            insertFases(etapaUpdate.id, etapaUpdate.fases.insert[i], function(claveFase){
                console.log("MAQUINARIAS", etapaUpdate.fases.insert[i].tipoMaquinaria.insert)
                insertCargos(claveFase, etapaUpdate.fases.insert[i].cargos.insert);
                insertTipoMaquinaria(claveFase, etapaUpdate.fases.insert[i].tipoMaquinaria.insert);
            })
        }
        for(let k=0; k<etapaUpdate.fases.delete.length; k++){
            Explotaciones.deleteFaseById(etapaUpdate.fases.delete[k].id)
        }
        for(let j=0; j<etapaUpdate.fases.update.length; j++){
            updateFase(etapaUpdate.fases.update[j])
            insertCargos(etapaUpdate.fases.update[j].id, etapaUpdate.fases.update[j].cargos.insert);
            insertTipoMaquinaria(etapaUpdate.fases.update[j].id, etapaUpdate.fases.update[j].tipoMaquinaria.insert);
            for(m=0; m<etapaUpdate.fases.update[j].cargos.delete.length; m++){
                deleteCargos(etapaUpdate.fases.update[j].id, etapaUpdate.fases.update[j].cargos.delete[m].id)
            }
            for(m=0; m<etapaUpdate.fases.update[j].tipoMaquinaria.delete.length; m++){
                deleteTipoMaquinaria(etapaUpdate.fases.update[j].id, etapaUpdate.fases.update[j].tipoMaquinaria.delete[m].id)
            }
        }
    })

    etapas.delete.forEach((etapaDelete) => {
        Yacimientos.deleteEtapa(etapaDelete.id)
    })

    etapas.insert.forEach((etapaInsert) => {
        Yacimientos.insertEtapa(etapaInsert, info.explotacion.id, function(claveEtapa){
            for(let i=0; i<etapaInsert.fases.insert.length;i++){
                insertFases(claveEtapa, etapaInsert.fases.insert[i], function(claveFase){
                    console.log("CARGOOS", etapaInsert.fases.insert[i].cargos)
                    console.log("MAQUINARIAS", etapaInsert.fases.insert[i])
                    insertCargos(claveFase, etapaInsert.fases.insert[i].cargos);
                    insertTipoMaquinaria(claveFase, etapaInsert.fases.insert[i].tipoMaquinaria.tipoMaquinaria);
                })
            }
        })
    })
}

const deleteTipoMaquinaria = (claveFase, info) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'DELETE FROM MU_TIPO_MAQUINARIA_FASE WHERE fk_tipo_maquinaria = ($1) AND fk_fase = ($2)';
    const values = [info, claveFase];
    client.query(text, values)
    .then((response) => {
        client.end();
    })
    .catch((e) => {
        client.end();
        console.error(e.stack);

    })
}

const deleteCargos = (claveFase, info) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'DELETE FROM MU_CARGO_FASE WHERE fk_cargo = ($1) AND fk_fase = ($2)';
    const values = [info, claveFase];
    client.query(text, values)
    .then((response) => {
        client.end();
    })
    .catch((e) => {
        client.end();
        console.error(e.stack);

    })
}

const updateFase = (info) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'UPDATE MU_FASE SET Nombre = ($1), Duracion = ($2), Costo = ($3) WHERE Clave = ($4) ';
    const values = [info.nombre, info.duracion, info.costo, info.id];
    client.query(text, values)
    .then((response) => {
        client.end();
    })
    .catch((e) => {
        client.end();
        console.error(e.stack);

    })
}

const insertFases = (claveEtapa, info, callback) => {
    const client = new Client({
        connectionString: process.env.POSTGRESQL_CONNECTION_STRING
    });
    client.connect();
    const text = 'INSERT INTO mu_fase (nombre, costo, duracion, fk_estatus, fk_etapa) VALUES ($1, $2, $3, 2, $4) RETURNING Clave';
    const values = [info.nombre, info.costo, info.duracion, claveEtapa];
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

const insertCargos = (claveFase, info) => {
    let values = [];
    info.forEach(item => {
        let value = []
        value.push(item.cantidad);
        value.push(item.sueldo);
        value.push(item.id);
        value.push(claveFase);
        // console.log(value)
        values.push(value);
    });
    // console.log(values)
    Explotaciones.createCargoFase(values)
}

const insertTipoMaquinaria = (claveFase, info) => {
    let values = [];
    info.forEach(item => {
        let value = []
        value.push(item.cantidad);
        value.push(item.costo);
        value.push(claveFase);
        value.push(item.id);
        // console.log(value)
        values.push(value);
    });
    // console.log(values)
    Explotaciones.createTipoMaquinariaFase(values)
}



const updateYacimiento = (req, res) => {
    console.log("ENTRO YACIMIENTO UPDATE")
    const info = req.body.data
    console.log('update', req.body.data)
    Yacimientos.modifYacimiento(info)
    Yacimientos.modifTipoYacimiento(info)
    if(info.minerales.insert.length>0){
        insertMinYac('metalico', info)
    }
    for(let i=0; i<info.minerales.update.length; i++){
        YacimientosMinerales.updateYacMinMet(info.yacimiento.id, info.minerales.update[i])
    }
    for(let i=0; i<info.minerales.delete.length; i++){
        YacimientosMinerales.deleteYacMinMet(info.yacimiento.id, info.minerales.delete[i])
    }
    if(info.mineralesNoMetalicos.insert.length>0){
        insertMinYac('no metalico', info)
    }
    for(let i=0; i<info.mineralesNoMetalicos.update.length; i++){
        YacimientosMinerales.updateYacMinNoMet(info.yacimiento.id, info.mineralesNoMetalicos.update[i])
    }
    for(let i=0; i<info.mineralesNoMetalicos.delete.length; i++){
        YacimientosMinerales.deleteYacMinNoMet(info.yacimiento.id, info.mineralesNoMetalicos.delete[i])
    }

    updateEtapas(info.etapas, info)

    res.status(200).json({ operacion: 'exito' })
}

const insertMinYac = (tipo, info) => {
    let values = [];
    if(tipo==='metalico'){
        console.log("MET", info.minerales.insert)
        info.minerales.insert.forEach(item => {
            let value = []
            value.push(item.total);
            value.push(item.id);
            value.push(null);
            value.push(info.yacimiento.id);
            // console.log(value)
            values.push(value);
        });
    }else if(tipo==='no metalico'){
        console.log("NOMET", info.mineralesNoMetalicos.insert)
        info.mineralesNoMetalicos.insert.forEach(item => {
            let value = []
            value.push(item.total);
            value.push(null);
            value.push(item.id);
            value.push(info.yacimiento.id);
            // console.log(value)
            values.push(value);
        });
    }
    // console.log(values)
    YacimientosMinerales.createMinYac(values)
}

module.exports = {
    crearConfiguracionYacimiento,
    updateYacimiento
}