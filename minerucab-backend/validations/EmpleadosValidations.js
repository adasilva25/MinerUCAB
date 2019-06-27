const Empleados = require('../database/model/Empleados');
const Usuarios = require('../database/model/Usuarios');

const crearEmpleado = (req, res, next) => {
    const info = req.body.data;
    console.log(req.body.data)

    if(!(info.usuarioasoc)){
    	Empleados.createEmpleado(info, function (claveEmpleado) {
            res.status(200).json({operacion: 'exito'})
        })

    }
    else{
        Empleados.createEmpleado(info, function (claveEmpleado) {
            Usuarios.createUsuario(claveEmpleado, info)
            res.status(200).json({operacion: 'exito'})
        })
    }
}

module.exports = {
    crearEmpleado,
}