const SolicitudesCompra = require('../database/model/SolicitudesCompra');

const crearSolCompra = (req, res, next) => {
    const info = req.body.data;
    console.log(req.body.data)
    
    SolicitudesCompra.insertSolCompra(info, function (claveSol) {
        SolicitudesCompra.insertDetalleSolCompra(claveSol, info)
        res.status(200).json({operacion: 'exito'})
    })
}

module.exports = {
    crearSolCompra
}