const Explotaciones = require('../database/model/Explotaciones');
const MaquinariasModel = require('../database/model/Maquinarias');
const Empleados = require('../database/model/Empleados');

const insertIntoHorarioEmpleado = (claveEmpleadoCargoFase, horarios) => {
    for (let i = 0; i < horarios.length; i++){
        Explotaciones.insertHorarioEmpleado(claveEmpleadoCargoFase, horarios[i])
    }
}

const insertEmpleadosYCargosEnEmpleadoCargoFase = (claveCargoFase, empleados) => {
    console.log('empleados', empleados)
    empleados.forEach((empleado) => {
        Explotaciones.insertIntoEmpleadoCargoFase(claveCargoFase, empleado.id, empleado.estatus, function(claveEmpleadoCargoFase){
            insertIntoHorarioEmpleado(claveEmpleadoCargoFase, empleado.horario)
            Empleados.updateEstatusEmpleadoById(empleado.id, empleado.estatus)
        })
    })
}

const insertIntoCargoFase = (faseId, cargos) => {
    console.log('cargos', cargos)
    cargos.forEach((cargo) => {
        Explotaciones.getClaveCargoFaseByCargoClaveYFaseClave(faseId, cargo.id, function(claveCargoFase){
            console.log('ccf', claveCargoFase)
            insertEmpleadosYCargosEnEmpleadoCargoFase(claveCargoFase, cargo.empleados)
        })
    })
}

const insertMaquinariaTipoMaquinariaFase = (claveTipoMaquinariaFase, maquinarias) => {
    console.log('maquinarias', maquinarias)
    maquinarias.forEach((maquinaria) => {
        if ((maquinaria.estatus === null) || (maquinaria.id === null)){

        }
        else{
            Explotaciones.insertIntoMaquinariaTipoMaquinariaFase(claveTipoMaquinariaFase, maquinaria.id)
            MaquinariasModel.updateEstatusMaquinaria(maquinaria.id, maquinaria.estatus)
        }
    })
}

const insertIntoTipoMaquinariaFase = (faseId, tipoMaquinarias) => {
    console.log('tipoMaquinarias', tipoMaquinarias)
    tipoMaquinarias.forEach((tipoMaquinaria) => {
        Explotaciones.getClaveTipoMaquinariaFase(faseId, tipoMaquinaria.id, function(claveTipoMaquinariaFase){
            insertMaquinariaTipoMaquinariaFase(claveTipoMaquinariaFase, tipoMaquinaria.maquinarias)
        })
    })
}

const insertIntoFasesInfo = (fases) => {
    console.log('fases')
    fases.forEach((fase) => {
        console.log('fase', fase)
        Explotaciones.insertFechasFases(fase.fechaI, fase.fechaF, fase.estatus, fase.id)
        insertIntoCargoFase(fase.id, fase.cargos)
        insertIntoTipoMaquinariaFase(fase.id, fase.tipoMaquinaria)
        Explotaciones.updateFaseEstatus(fase.id, fase.estatus)
    })
}

const insertIntoEtapaInfo = (etapas) => {
    console.log('etapas')
    etapas.forEach((etapa) => {
        Explotaciones.insertFechasEtapas(etapa.fechaI, etapa.fechaF, etapa.estatus, etapa.id)
        insertIntoFasesInfo(etapa.fases)
        console.log('etapa', etapa.id)
        Explotaciones.updateEtapaEstatus(etapa.id, etapa.estatus)
    })
}

const crearExplotacion = (req, res) => {
    const yacimiento = req.body.data.yacimiento;
    const explotacion = req.body.data.explotacion;
    const etapas = req.body.data.etapas;

    console.log('yacimiento', yacimiento)
    console.log('explotacion', explotacion)
    console.log('etapas', etapas)

    Explotaciones.updateEstatusExplotaciones(explotacion.id, explotacion.estatus, explotacion.fechaI, explotacion.fechaF)
    Explotaciones.updateEstatus(yacimiento.id, 5)
    Explotaciones.insertFechas(explotacion.fechaI, explotacion.fechaF, explotacion.estatus)
    insertIntoEtapaInfo(etapas);
    res.status(200).json()
}

const deleteHorarioEmpleado = (claveCargoFase, callback) => {
    Explotaciones.getClaveEmpleadoCargoFaseByCargoFase(claveCargoFase, function(claveEmpleadoCargoFase){
        Explotaciones.deleteFromHorarioEmpleado(claveEmpleadoCargoFase, function(){
            callback()
        })
    })
}

const updateEmpleadosEnEmpleadoCargoFase = (claveCargoFase, empleados) => {
    console.log('empleados', empleados)
    deleteHorarioEmpleado(claveCargoFase, function(){
        Explotaciones.deleteFromEmpleadoCargoFase(claveCargoFase, function(){
            empleados.forEach((empleado) => {
                Explotaciones.insertIntoEmpleadoCargoFase(claveCargoFase, empleado.id, empleado.estatus, function(claveEmpleadoCargoFase){
                    insertIntoHorarioEmpleado(claveEmpleadoCargoFase, empleado.horario)
                    Empleados.updateEstatusEmpleadoById(empleado.id, empleado.estatus)
                })
            })
        })
    })
}

const updateCargoFase = (faseId, cargos) => {
    console.log('cargos', cargos)
    cargos.forEach((cargo) => {
        Explotaciones.getClaveCargoFaseByCargoClaveYFaseClave(faseId, cargo.id, function(claveCargoFase){
            console.log('ccf', claveCargoFase)
            updateEmpleadosEnEmpleadoCargoFase(claveCargoFase, cargo.empleados)
        })
    })
}

const deleteMaquinariaTipoMaquinariaFase = (claveTipoMaquinariaFase, callback) => {
    Explotaciones.deleteFromMaquinariaTipoMaquinariaFase(claveTipoMaquinariaFase, function(){
        callback()
    })
}

const updateTipoMaquinariaFase = (faseId, tipoMaquinarias) => {
    console.log('tipoMaquinarias', tipoMaquinarias)
    tipoMaquinarias.forEach((tipoMaquinaria) => {
        Explotaciones.getClaveTipoMaquinariaFase(faseId, tipoMaquinaria.id, function(claveTipoMaquinariaFase){
            deleteMaquinariaTipoMaquinariaFase(claveTipoMaquinariaFase, function(){
                insertMaquinariaTipoMaquinariaFase(claveTipoMaquinariaFase, tipoMaquinaria.maquinarias)
            })
        })
    })
}

const updateFases = (fases) => {
    console.log('fases')
    fases.forEach((fase) => {
        Explotaciones.updateFechaEstatusFases(fase.fechaI, fase.fechaF, fase.fechaFR, fase.estatus, fase.id)
        updateCargoFase(fase.id, fase.cargos)
        updateTipoMaquinariaFase(fase.id, fase.tipoMaquinaria)
    })
}

const updateEtapas = (etapas) => {
    console.log('etapas')
    etapas.forEach((etapa) => {
        Explotaciones.updateFechaEstatusEtapas(etapa.fechaI, etapa.fechaF, etapa.fechaFR, etapa.estatus, etapa.id)
        updateFases(etapa.fases)
    })
}

const updateExplotacion = (req, res) => {
    const yacimiento = req.body.data.yacimiento;
    const explotacion = req.body.data.explotacion;
    const etapas = req.body.data.etapas;

    console.log('yacimiento', yacimiento)
    console.log('explotacion', explotacion)
    console.log('etapas', etapas)

    Explotaciones.updateEstatusExplotaciones(explotacion.id, explotacion.estatus, explotacion.fechaI, explotacion.fechaF)
    Explotaciones.updateFechaFinReal(fechaFR, explotacion.id)
    updateEtapas(etapas)
}

module.exports = {
    crearExplotacion,
    updateExplotacion
}