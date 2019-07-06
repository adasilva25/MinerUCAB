const Roles = require('../database/model/Roles');

const crearRol = (req, res, next) => {
    const info = req.body.data;
    console.log(req.body.data)

    Roles.createRol(info, function(claveRol){
        insertPrivilegiosRol(claveRol, info)
        
    })
    res.status(200).json({operacion: 'exito'})
}

const modificarRol = (req, res, next) => {
    const info = req.body.data;
    Roles.updateRolById(info)
    if(info.privilegios.length>0){
        insertPrivilegiosRol(info.clave, info)
    }
    if(info.privilegiosdelete.length>0){
        for(let i=0; i<info.privilegiosdelete.length; i++){
            Roles.deletePrivilegiosRol(info.privilegiosdelete[i].relacion)
        }
    }
    
    res.status(200).json({operacion: 'exito'})
}

const insertPrivilegiosRol = (claveRol, info) => {
    let values = [];
    info.privilegios.forEach(item => {
        let value = []
        value.push(claveRol);
        value.push(item.clave);
        // console.log(value)
        values.push(value);
    });
    // console.log(values)
    Roles.createPrivilegiosRol(values)
}

module.exports = {
    crearRol,
    modificarRol,
}