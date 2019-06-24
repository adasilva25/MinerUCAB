const Pagos = require('../database/model/Pagos');

const getPagosChequeDeVenta = (req, response) => {
    Pagos.getPagosChequeByIdDeVenta(req.params.id, function(res){
        if (res !== undefined){
            response.status(200).json({
                res: res.rows, 
                tipoPago: 'cheque'
            })
        }
        else {
            response.status(404)
        }
    })
}

const getPagosTarjetaCreditoDeVenta = (req, response) => {
    Pagos.getPagosTarjetaCreditoByIdDeVenta(req.params.id, function(res){
        if (res !== undefined){
            response.status(200).json({
                res: res.rows, 
                tipoPago: 'tarjeta_credito'
            })
        }
        else {
            response.status(404)
        }
    })
}

const getPagosTarjetaDebitoDeVenta = (req, response) => {
    Pagos.getPagosTarjetaDebitoByIdDeVenta(req.params.id, function(res){
        if (res !== undefined){
            response.status(200).json({
                res: res.rows, 
                tipoPago: 'tarjeta_debito'
            })
        }
        else {
            response.status(404)
        }
    })
}

const getPagosTransferenciaDeVenta = (req, response) => {
    Pagos.getPagosTransferenciaByIdDeVenta(req.params.id, function(res){
        if (res !== undefined){
            response.status(200).json({
                res: res.rows, 
                tipoPago: 'transferencia'
            })
        }
        else {
            response.status(404)
        }
    })
}

module.exports = {
    getPagosChequeDeVenta,
    getPagosTarjetaCreditoDeVenta,
    getPagosTarjetaDebitoDeVenta,
    getPagosTransferenciaDeVenta
}