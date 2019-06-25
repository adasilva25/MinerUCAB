const Minerales = require('../database/model/Minerales');

const crearMineralMetalico = (req, res, next) => {
    const info = req.body.data;
    console.log(req.body.data)

    Minerales.createMineralMetalico(info, function(claveMineralMet){
        if(info.tienec){
            insertComponentesMinMet(claveMineralMet, info)
        }
        if(info.tienep){
            insertPresentacionesMinMet(claveMineralMet, info)
        }
        
        res.status(200).json({operacion: 'exito'})
    })
}

const crearMineralNoMetalico = (req, res, next) => {
    const info = req.body.data;
    console.log(req.body.data)

    Minerales.createMineralNoMetalico(info, function(claveMineralNoMet){
        if(info.tienec){
            insertComponentesMinNoMet(claveMineralNoMet, info)
        }
        if(info.tienep){
            insertPresentacionesMinNoMet(claveMineralNoMet, info)
        }
        
        
        res.status(200).json({operacion: 'exito'})
    })
}

const insertPresentacionesMinMet = (claveMinMet, info) => {
    let values = [];
    info.presentaciones.forEach(item => {
        let value = []
        value.push(item.precio);
        value.push(item.idPresentacion);
        value.push(claveMinMet);
        // console.log(value)
        values.push(value);
    });
    // console.log(values)
    Minerales.createPresentacionMineralMet(values)
}

const insertPresentacionesMinNoMet = (claveMinNoMet, info) => {
    let values = [];
    info.presentaciones.forEach(item => {
        let value = []
        value.push(item.precio);
        value.push(item.idPresentacion);
        value.push(claveMinNoMet);
        // console.log(value)
        values.push(value);
    });
    // console.log(values)
    Minerales.createPresentacionMineralNoMet(values)
}

const insertComponentesMinMet = (claveMinMet, info) => {
    let values = [];
    info.componentes.forEach(item => {
        let value = []
        value.push(item.porcentaje);
        value.push(claveMinMet);
        value.push(item.idComponente);
        // console.log(value)
        values.push(value);
    });
    // console.log(values)
    Minerales.createComponenteMineralMet(values)
}

const insertComponentesMinNoMet = (claveMinNoMet, info) => {
    let values = [];
    info.componentes.forEach(item => {
        let value = []
        value.push(item.porcentaje);
        value.push(claveMinNoMet);
        value.push(item.idComponente);
        // console.log(value)
        values.push(value);
    });
    // console.log(values)
    Minerales.createComponenteMineralNoMet(values)
}

module.exports = {
    crearMineralMetalico,
    crearMineralNoMetalico
}