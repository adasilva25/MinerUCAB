const Ventas = require('../database/model/Ventas');
const ClientesNaturales = require('../database/model/ClientesNaturales');
const DetalleVentas = require('../database/model/DetalleVentas');
const Pago = require('../database/model/Pagos');
const TipoPago = require('../database/model/TipoPago');

const insertDetalleVenta = (claveVenta, info) => {
    let values = [];
    info.pedidos.forEach(item => {
        let value = []
        value.push(item.cantidad);
        value.push(item.precio);
        value.push(claveVenta),
        value.push(8),
        value.push(item.idPresentacionMineral);
        // console.log(value)
        values.push(value);
    });
    // console.log(values)
    DetalleVentas.createDetalleVenta(values)
}

const insertPagos = (claveVenta, info) => {
    let values = [];
    info.pagos.forEach(item => {
        let value = []
        value.push(item.banco);
        console.log('typeof', typeof item.detalle.detalle1)
        if (item.tipo === 'Cheque'){
            value.push(item.detalle.detalle1);
            value.push(item.detalle.detalle2);
            values.push(value)
            console.log('cheque')
            TipoPago.createTipoPagoCheque(values, function (claveTipoPago) {
                console.log('pri')
                Pago.createPagoCheque(item.monto, claveVenta, claveTipoPago)
            })
        }
        else if (item.tipo === 'Tarjeta de Crédito'){
            console.log('tc')
            value.push(item.detalle.detalle1);
            value.push(item.detalle.detalle2);
            values.push(value)
            TipoPago.createTipoPagoTC(values, function (claveTipoPago) {
                Pago.createPagoTC(item.monto, claveVenta, claveTipoPago)
            })
        }
        else if (item.tipo === 'Tarjeta de Débito'){
            console.log('td')
            value.push(item.detalle.detalle1);
            values.push(value)
            TipoPago.createTipoPagoTD(values, function (claveTipoPago) {
                Pago.createPagoTD(item.monto, claveVenta, claveTipoPago)
            })
        }
        else if (item.tipo === 'Transferencia'){
            value.push(item.detalle.detalle1);
            value.push(item.detalle.detalle2);
            values.push(value)
            console.log('transferencia')
            TipoPago.createTipoPagoTransferencia(values, function (claveTipoPago) {
                Pago.createPagoTransferencia(item.monto, claveVenta, claveTipoPago)
            })
        }
        // console.log(value)
        values.push(value);
    });
}

const createVenta = (req, res, next) => {
    console.log('entro')
    const info = req.body.data;
    console.log(req.body.data.idCliente)
    console.log(req.body.data)
    console.log(new Date().getTime())
    // const obj = JSON.parse(req.body.data)
    // console.log(obj)
    // console.log(obj.pago)

    if ((req.body.data.tipoCliente[0] === 'V') || info.tipoCliente[0] === 'E'){
        Ventas.createVentaClienteNatural(info.total, info.idCliente, 8, function (claveVenta) {
            insertDetalleVenta(claveVenta, info)
            insertPagos(claveVenta, info)
            res.status(200)
        })
    }
    else if (info.tipoCliente[0] === 'J'){
        Ventas.createVentaClienteJuridico(info.total, info.idCliente, 8, function (claveVenta) {
            insertDetalleVenta(claveVenta, info)
            insertPagos(claveVenta, info)
            res.status(200)
        })
    }
}

const getVentaInfo = (req, res) => {
    console.log('getVentaInfo')
    Ventas.getFkClienteNaturalEnVentaById(req.params.id, function(claveClienteNatural) {
        console.log('claveClienteNatural', claveClienteNatural)
        if (claveClienteNatural !== null){
            res.status(200).json({
                tipo: 'natural',
                clave: claveClienteNatural
            })
        }
        else {
            Ventas.getFkClienteJuridicoEnVentaById(req.params.id, function(claveClienteJuridico){
                res.status(200).json({
                    tipo: 'jurídico',
                    clave: claveClienteJuridico
                })
            })
        }
    })
}

module.exports = {
    createVenta,
    getVentaInfo
}