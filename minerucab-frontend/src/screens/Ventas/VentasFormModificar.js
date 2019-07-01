import React from 'react';
import Button from 'react-bootstrap/Button';
// https://react-bootstrap.github.io/components/buttons/
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import OpcionesLocales from '../../components/OpcionesLocales';
import InputGroup from 'react-bootstrap/InputGroup';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import axios from 'axios';

// https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input

export default class VentasForm extends React.Component {
    state = {
        prueba: true,
        nombre: '',
        ci: '',
        total: 0,
        estatus: 0,
        minerales: [],
        pedidos: [],
        pagos: [],
        tipopago:'',
        detallePago1: '',
        detallePago2: '',
        showMessage1: false,
        showMessage2: false,
        conflicto: false,
    }
    componentDidMount = () => {
        console.log('this.props.match.params.id', this.props.match.params.id)
        const config = {
            headers: {
              'Content-Type': 'application/json'
            },
            responseType: 'json'
        }

        axios.get(`http://localhost:3000/getVentaById/${this.props.match.params.id}`, config)
            .then((res) => {
                console.log(res)
                const date = new Date(res.data[0].fecha)
                const dia = date.getDate()
                const mes = (date.getMonth() + 1)
                const ano = date.getFullYear()
                this.setState((prevState) => ({
                    total: res.data[0].total,
                    estatus: res.data[0].clave_estatus,
                    fecha: `${dia}-${mes}-${ano}`
                }));
                axios.get(`http://localhost:3000/getPagosChequeDeVenta/${this.props.match.params.id}`)
                    .then((res) => {
                        console.log('cheque', res.data.res)
                        if (res.data.res.length !== 0) {
                            res.data.res.forEach(element => {
                                let pago = {
                                    monto: '',
                                    banco: '',
                                    tipoPago: '',
                                    detalle1: '',
                                    detalle2: ''
                                }
                                pago.monto = element.monto;
                                pago.banco = element.banco;
                                pago.tipoPago = 'Cheque';
                                pago.detalle1 = element.numero_cheque;
                                pago.detalle2 = element.numero_cuenta;
                                // console.log(mineralInfo)
                                this.setState((prevState) => ({
                                    pagos: prevState.pagos.concat(pago)
                                }));
                                console.log('state', this.state.pagos)
                            })
                        }
                    })
                    .catch((e) => {
                        console.log('Error en axios')
                    })
                axios.get(`http://localhost:3000/getPagosTransferenciaDeVenta/${this.props.match.params.id}`)
                .then((res) => {
                    console.log('trans', res.data.res)
                    if (res.data.res.length !== 0){
                        res.data.res.forEach(element => {
                            let pago = {
                                monto: '',
                                banco: '',
                                tipoPago: '',
                                detalle1: '',
                                detalle2: ''
                            }
                            pago.monto = element.monto;
                            pago.banco = element.banco;
                            pago.tipoPago = 'Transferencia';
                            pago.detalle1 = element.numero_cuenta;
                            pago.detalle2 = element.numero_referencia;
                            // console.log(mineralInfo)
                            this.setState((prevState) => ({
                                pagos: prevState.pagos.concat(pago)
                            }));
                        })
                    }
                })
                .catch((e) => {
                    console.log('Error en axios')
                })
                axios.get(`http://localhost:3000/getPagosTarjetaCreditoDeVenta/${this.props.match.params.id}`)
                    .then((res) => {
                        if (res.data.res.length !== 0){
                            res.data.res.forEach(element => {
                                let pago = {
                                    monto: '',
                                    banco: '',
                                    tipoPago: '',
                                    detalle1: '',
                                    detalle2: ''
                                }
                                pago.monto = element.monto;
                                pago.banco = element.banco;
                                pago.tipoPago = 'Tarjeta Crédito';
                                pago.detalle1 = element.numero_tarjeta;
                                pago.detalle2 = element.tipo;
                                // console.log(mineralInfo)
                                this.setState((prevState) => ({
                                    pagos: prevState.pagos.concat(pago)
                                }));
                            })
                        }
                    })
                    .catch((e) => {
                        console.log('Error en axios')
                    })
                axios.get(`http://localhost:3000/getPagosTarjetaDebitoDeVenta/${this.props.match.params.id}`)
                .then((res) => {
                    if (res.data.res.length !== 0){
                        res.data.res.forEach(element => {
                            let pago = {
                                monto: '',
                                banco: '',
                                tipoPago: '',
                                detalle1: ''
                            }
                            pago.monto = element.monto;
                            pago.banco = element.banco;
                            pago.tipoPago = 'Tarjeta Débito';
                            pago.detalle1 = element.numero_tarjeta;
                            console.log('seteo', pago)
                            this.setState((prevState) => ({
                                pagos: prevState.pagos.concat(pago)
                            }));
                        })
                    }
                })
                .catch((e) => {
                    console.log('Error en axios')
                })
                axios.get(`http://localhost:3000/getDetalleVentaByIdVenta/${this.props.match.params.id}`)
                .then((res) => {
                    res.data.forEach(element => {
                        let pedido = {
                            cantidad: '',
                            estatus: '',
                            presentacion: '',
                            precio: ''
                        }
                        pedido.cantidad = element.cantidad;
                        pedido.estatus = element.fk_estatus;
                        pedido.presentacion = element.fk_presentacion_mineral;
                        pedido.precio = element.precio;
                        // console.log(mineralInfo)
                        this.setState((prevState) => ({
                            pedidos: prevState.pedidos.concat(pedido)
                        }));
                    })
                    
                })
                .catch((e) => {
                    console.log('Error en axios')
                })
            }).catch((e) => {
                console.log('Error en axios')
            })
        
        axios.get(`http://localhost:3000/getVentaInfo/${this.props.match.params.id}`, config)
            .then((res) => {
                if (res.data.tipo === 'natural'){
                    axios.get(`http://localhost:3000/getClienteById/${res.data.clave}`, config)
                    .then((res) => {
                        console.log(res)
                        this.setState(() => ({
                            nombre: res.data[0].p_nombre + ' ' + res.data[0].p_apellido,
                            ci: res.data[0].ci
                        }));
                    }).catch((e) => {
                        console.log('Error en axios')
                    })
                    // console.log(this.state.minerales)
                }
                else {
                    axios.get(`http://localhost:3000/getClienteJuridicoById/${res.data.clave}`, config)
                    .then((res) => {
                        console.log(res)
                        this.setState(() => ({
                            nombre: res.data[0].nombre,
                            ci: res.data[0].rif
                        }));
                    }).catch((e) => {
                        console.log('Error en axios')
                    })
                }  
            }).catch((e) => {
                console.log('Error en axios')
            })

        axios.get('http://localhost:3000/getAllMineralesMetalicosConPresentacion', config)
            .then((res) => {
                res.data.forEach(element => {
                    let mineralInfo = {
                        tipoMineral: 'metalico',
                        idBdPresentacionMineral: '',
                        nombre: '',
                        presentacion: '',
                        precio: 0
                    }
                    mineralInfo.idBdPresentacionMineral = element.clave;
                    mineralInfo.nombre = element.mineral;
                    mineralInfo.presentacion = element.presentacion;
                    mineralInfo.precio = element.precio;
                    // console.log(mineralInfo)
                    this.setState((prevState) => ({
                        minerales: prevState.minerales.concat(mineralInfo)
                    }));
                })
            }).catch((e) => {
                console.log('Error en axios')
            })

            axios.get('http://localhost:3000/getAllMineralesNoMetalicosConPresentacion', config)
            .then((res) => {
                res.data.forEach(element => {
                    let mineralInfo = {
                        tipoMineral: 'no metalico',
                        idBdPresentacionMineral: '',
                        nombre: '',
                        presentacion: '',
                        precio: 0
                    }
                    mineralInfo.idBdPresentacionMineral = element.clave;
                    mineralInfo.nombre = element.mineral;
                    mineralInfo.presentacion = element.presentacion;
                    mineralInfo.precio = element.precio;
                    // console.log(mineralInfo)
                    this.setState((prevState) => ({
                        minerales: prevState.minerales.concat(mineralInfo)
                    }));
                })
            }).catch((e) => {
                console.log('Error en axios')
            })
        
    
    }
    onChangeModificarVenta = (e) => {
        console.log("modificado", e.target.value)
         /*this.setState(() => {
             estatus: e.target.value
         })*/
        console.log('post state', this.state.estatus)
    }
    updateVenta = (e) => {
        const info = {
            estado: document.getElementById('update-venta').value,
            pedido: this.state.pedidos
        }
        console.log(info)
        const config = {
            headers: {
              'Content-Type': 'application/json'
            },
            responseType: 'json'
        }
        this.state.pedidos.forEach((element) => {
            axios.get(`http://localhost:3000/getCantActualByIdPres/${element.presentacion}`, config)
                .then((res) => {
                    console.log('res pedidos m', res)
                    if(res.data.length===0){
                        this.setState((prevState) => ({
                            conflicto: true
                        }));
                    }else{
                        if(res.data[0].cantidad_actual<(element.precio*element.cantidad)){
                            this.setState((prevState) => ({
                                conflicto: true
                            }));
                        }else if(res.data[0].cantidad_actual<(element.precio*element.cantidad)){
                        }
                    }
                    if(this.state.conflicto===true){
                        alert("El inventario no posee la cantidad necesaria para cubrir esta venta. Inicie una explotación de los minerales deseados.")
                    }
                    if(this.state.conflicto===false){
                        const configup = {
                            headers: {
                              'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            responseType: 'json',
                            data: info
                        }

                        axios.put('http://localhost:3000/updateVenta', configup)
                            .then((res) => {
                            }).catch((e) => {
                                console.log('Error en axios')
                            })
                    }
                }).catch((e) => {
                    console.log('Error en axios')
                })
        })
    }
    dropdownChange = (e) => {
        const nombreMineral = this.state.minerales[e.target.value].nombre;
        console.log(nombreMineral)
        
        let optionNumber = 0;
        const cantidad = parseFloat(document.getElementsByClassName("form-input-text-cantidad")[e.target.id].value);
        console.log('cantidad', cantidad);

        console.log(document.getElementsByClassName('form-input-dropdown-presentacion-venta'))
        

        const precioMineralAnterior = document.getElementsByClassName('form-input-text-precio-unitario')[e.target.id].value;
        console.log('precioMineralAnterior', precioMineralAnterior)
        const precioTotalAnterior = Math.round(parseFloat(document.getElementsByClassName("form-input-total-venta")[0].value) * 100) / 100;
        console.log('precioTotalAnterior', precioTotalAnterior)

        console.log(e.target)
        console.log('e.target.id', e.target.id);
        console.log('e.target.value', e.target.value);
        // console.log(document.getElementsByClassName("form-input-dropdown-presentacion-venta")[e.target.id].length);
        while (document.getElementsByClassName("form-input-dropdown-presentacion-venta")[e.target.id].length) {
            document.getElementsByClassName("form-input-dropdown-presentacion-venta")[e.target.id].remove(0);
        }
        
        for (let i = 0; i < this.state.minerales.length; i++){
            // console.log(this.state.minerales[i].nombre)
            if (this.state.minerales[i].nombre === nombreMineral){
                // console.log(this.state.minerales[i].presentacion)
                let presentacion = new Option(this.state.minerales[i].presentacion, i);
                document.getElementsByClassName("form-input-dropdown-presentacion-venta")[e.target.id].add(presentacion);
                optionNumber = optionNumber + 1;
            }
        }

        // console.log(document.getElementsByClassName('form-input-dropdown-presentacion-venta'))

        // console.log('e value', e.target.value);
        // console.log('e', e.target.id)
        // console.log('p', document.getElementsByClassName("form-input-dropdown-presentacion-venta")[e.target.id])
        
        const indexOptionInDropdown = e.target.id;
        const indexOptionInState = e.target.value;

        // console.log('nombreM', nombreMineral);
        // const nombrePresentacion = parseInt(document.getElementsByClassName('form-input-dropdown-presentacion-venta')[e.target.id].textContent);
        // console.log('nombreP', nombrePresentacion);  
        
        document.getElementsByClassName('form-input-text-precio-unitario')[e.target.id].value = 
            this.state.minerales[document.getElementsByClassName("form-input-dropdown-presentacion-venta")[e.target.id].value].precio;

        let precios = document.getElementsByClassName("form-input-precio-mineral-venta");
        

        const total = 
            this.state.minerales[document.getElementsByClassName("form-input-dropdown-presentacion-venta")[e.target.id].value].precio
             
        // const precioNuevoMineral = document.getElementsByClassName('form-input-text-precio-unitario')[e.target.id].value;
        
        const precioNuevoMineral = this.state.minerales[document.getElementsByClassName("form-input-dropdown-presentacion-venta")[e.target.id].value].precio;
        console.log('precioNuevoMineral', precioNuevoMineral)
        const nuevoTotal = precioTotalAnterior - (precioMineralAnterior * cantidad) + (precioNuevoMineral * cantidad);
        console.log('precioMineralAnterior * cantidad', precioMineralAnterior * cantidad);
        console.log('(precioNuevoMineral * cantidad)', (precioNuevoMineral * cantidad));
        console.log('nuevoTotal', nuevoTotal)
        document.getElementsByClassName("form-input-total-venta")[0].value = Math.round(nuevoTotal * 100) / 100;

                // this.setState({total: this.state.total+total})

                // for (let i = 0; i < precios.length; i++){
                //     total += precios[i].value;
                // }
        
                // console.log('total',total);

        // for (let i = 0; i < this.state.minerales.length; i++){
        //     // console.log(this.state.minerales[i].nombre)
        //     if (this.state.minerales[i].nombre === nombreMineral){
        //         // console.log(this.state.minerales[i].presentacion)
        //         if (this.state.minerales[i].presentacion === nombrePresentacion){
        //             // console.log('entro')
        //             document.getElementsByClassName('form-input-text-precio-unitario')[indexOptionInDropdown].value = this.state.minerales[i].precio;
        //         }
        //     }
        // }
        
        
        // document.getElementsByClassName('form-input-text-precio-unitario')[e.target.id].value = 
        //     this.state.minerales[e.target.value].precio;

        // console.log(document.getElementsByClassName("form-input-dropdown-presentacion-venta")[e.target.id].length);

        // this.renderPrecioUnitario(e)

        // console.log(document.getElementsByClassName("form-input-dropdown").length)
        
    }
    onSubmit = (e) => {
        console.log('on sub', document.getElementsByClassName('form-input-total-venta')[0].value)
        
        let detalle2 = this.state.detallePago2;

        if (this.state.detallePago1 === ''){
            this.setState(() => ({
                showMessage1: true
            }))
            if (this.state.detallePago2 === ''){
                console.log(document.getElementsByClassName('form-input-dropdown-tipopago-venta')[0].value)
                if (document.getElementsByClassName('form-input-dropdown-tipopago-venta')[0].value !== 'Tarjeta de Crédito'){
                    this.setState(() => ({
                        showMessage2: true
                    }))
                }
            }
        }
        else if ((this.state.detallePago2 === '') && (document.getElementsByClassName('form-input-dropdown-tipopago-venta')[0].value !== 'Tarjeta de Crédito')){
            if (this.state.detallePago2 === ''){
                this.setState(() => ({
                    showMessage2: true
                }))
            }
            else{
                this.setState(() => ({
                    showMessage2: false
                }))
            }
        }
        else {
            this.setState(() => ({
                showMessage2: false
            }))
            this.setState(() => ({
                showMessage1: false
            }))

            if (document.getElementsByClassName('form-input-dropdown-tipopago-venta')[0].value === 'Tarjeta de Crédito'){
                detalle2 = document.getElementById('form-input-tipopagodetalle2-ventas')[0].value
                console.log('deta', document.getElementById('form-input-tipopagodetalle2-ventas'))
            }

            let venta = {
                idCliente: this.props.match.params.id[1],
                tipoCliente: document.getElementsByClassName('form-input-id')[0].value,
                pagos: [{
                    tipo: document.getElementsByClassName('form-input-dropdown-tipopago-venta')[0].value,
                    banco: document.getElementsByClassName('form-input-dropdown-banco-venta')[0].value,
                    detalle: {
                        detalle1: this.state.detallePago1,
                        detalle2: detalle2
                    },
                    monto: document.getElementsByClassName('form-input-total-venta')[0].value
                }],
                pedidos: [],
                total: document.getElementsByClassName('form-input-total-venta')[0].value
            }

            const numPedidos = document.getElementsByClassName('form-input-dropdown-mineral-venta').length
    
            for (let i = 0; i < numPedidos; i++){
                const indexInState = document.getElementsByClassName('form-input-dropdown-mineral-venta')[i].value
    
                let pedido = {
                    idPresentacionMineral: this.state.minerales[indexInState].idBdPresentacionMineral,
                    cantidad: document.getElementsByClassName('form-input-text-cantidad')[i].value,
                    precio: document.getElementsByClassName('form-input-text-precio-unitario')[i].value
                }
    
                // tipoMineral: 'metalico',
                // idBdPresentacionMineral: '',
                // nombre: '',
                // presentacion: '',
                // precio: 0
    
                venta.pedidos.push(pedido)
                console.log('pedido', pedido)
    
            }
    
            console.log(venta)

            const config = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                responseType: 'json',
                data: venta
            }
            
            axios.post('http://localhost:3000/createVenta', config)
                .then((res) => {
                    console.log(res)
                }).catch((e) => {
                    console.log('Error en axios')
                })
        }
        
        // console.log(document.getElementsByClassName("form-input-dropdown-mineral-venta"));
        // console.log(document.getElementsByClassName("form-input-dropdown-mineral-venta")[0].value);


        // console.log(document.getElementsByClassName("form-input-dropdown-presentacion-venta"));
        // console.log(document.getElementsByClassName("form-input-dropdown-presentacion-venta")[0].value);    // Posicion en el state

        // console.log(this.state.minerales[document.getElementsByClassName("form-input-dropdown-mineral-venta")[0].value].nombre)
        // console.log(document.getElementsByClassName("form-input-dropdown-mineral-venta")[1].value);
        // console.log(this.state.minerales[document.getElementsByClassName("form-input-dropdown-mineral-venta")[1].value])
        // console.log(document.getElementsByClassName("form-input-dropdown-mineral-venta")[2].value);
        // console.log(this.state.minerales[document.getElementsByClassName("form-input-dropdown-mineral-venta")[2].value])
    }
    addPedido = (e) => {
        const nuevoPedido = {
            mineral: "Oro",
            cantidad: 0
        };

        this.setState((prevState) => ({
            pedido: prevState.pedido.concat(nuevoPedido)
        }));

        const precioTotalAnterior = parseFloat(document.getElementsByClassName("form-input-total-venta")[0].value);
        console.log('precioTotalAnterior add', Math.round(precioTotalAnterior * 100) / 100)
        const nuevoTotal = (Math.round(precioTotalAnterior * 100) / 100) + parseFloat(this.state.minerales[0].precio);
        console.log(parseFloat(this.state.minerales[0].precio))
        document.getElementsByClassName("form-input-total-venta")[0].value = nuevoTotal;
        document.getElementsByClassName("form-input-total-venta")[0].value = Math.round(document.getElementsByClassName("form-input-total-venta")[0].value * 100) / 100;
        console.log('total-value', document.getElementsByClassName("form-input-total-venta")[0].value)
    }
    renderOptions = (tipo, indexF) => {
        
        if (tipo === 'mineral'){
            let mineral = [];
            return (this.state.minerales.map((optionMin, index) => {
                // indexF++;
                let existe = 0;
                mineral.forEach(element => {
                    if (optionMin.nombre === element){
                        existe = 1;
                    }
                })

                if (existe === 0){
                    mineral.push(optionMin.nombre);
                    return(<option value={index}>{optionMin.nombre}</option>)
                }
            }));
        }
        else if (tipo === 'presentacion'){
            if (this.state.minerales.length > 0){
                let firstElement = 0;
                return (this.state.minerales.map((optionMin, index) => {
                    // indexF++;
                    if (this.state.minerales[0].nombre === optionMin.nombre){
                        // if (firstElement === 0){
                            // document.getElementsByClassName('form-input-text-precio-unitario')[0].value = this.state.minerales[0].precio;
                            // console.log(typeof document.getElementsByClassName('form-input-total-venta')[0].value === 'string')
                            // document.getElementsByClassName("form-input-total-venta")[0].value = this.state.minerales[0].precio.toString();
                        // }
                        return(<option value={index}>{optionMin.presentacion}</option>)
                    }
                }));
            }
            
        }
    }
    renderPrecioUnitario = (e) => {
        // e.persist()

        // console.log(e);
        // if (document.getElementsByClassName("form-input-dropdown-presentacion-venta")[index]){
            
            // console.log(document.getElementsByClassName("form-input-dropdown-mineral-venta"))
            // console.log(document.getElementsByClassName("form-input-dropdown-presentacion-venta"))
        // }


        // if (typeof e.target.value === 'string'){
            console.log('e value', e.target.value);
            console.log('e', e.target.id)

            const precio = this.state.minerales[e.target.value].precio;

            const cantidad = parseFloat(document.getElementsByClassName("form-input-text-cantidad")[e.target.id].value);
            console.log('cantidad', cantidad);

            const precioMineralAnterior = parseFloat(document.getElementsByClassName('form-input-text-precio-unitario')[e.target.id].value);
            console.log('precioMineralAnterior', precioMineralAnterior)
            const precioTotalAnterior = parseFloat(document.getElementsByClassName("form-input-total-venta")[0].value);
            console.log('precioTotalAnterior', precioTotalAnterior)
            console.log('precioActual', precio)
            const nuevoTotal = precioTotalAnterior - (precioMineralAnterior * cantidad) + (this.state.minerales[e.target.value].precio * cantidad);
            console.log(precioMineralAnterior * cantidad);
            console.log('nuevoTotal', nuevoTotal);
            document.getElementsByClassName("form-input-total-venta")[0].value = Math.round(nuevoTotal * 100) / 100;


            document.getElementsByClassName('form-input-text-precio-unitario')[e.target.id].value = 
                this.state.minerales[e.target.value].precio;
        // }

        console.log(document.getElementsByClassName("form-input-total-venta"));
        console.log(typeof parseFloat(document.getElementsByClassName("form-input-total-venta")[0].value) === 'number')


        
        // let cantidadAnterior;
        // let cantidadActual;

        // // console.log(typeof document.getElementsByClassName('form-input-text-cantidad')[e.target.id].alt);
        

        // if (e.target.value.length > 0){
        //     console.log('>0')
        //     cantidadActual = document.getElementsByClassName('form-input-text-cantidad')[e.target.id].value;
        // }
        // else{
        //     cantidadActual = 0;
        // }

        // const precioMineral = document.getElementsByClassName('form-input-text-precio-unitario')[e.target.id].value;
        // console.log('precioMin', precioMineral)
        // cantidadAnterior = document.getElementsByClassName('form-input-text-cantidad')[e.target.id].alt;
        // console.log('cantidadActual', cantidadActual)
        // const totalAnterior = document.getElementsByClassName("form-input-total-venta")[0].value
        // console.log('totalAnterior', totalAnterior)
        // const totalActual = totalAnterior - (cantidadAnterior * precioMineral) + (cantidadActual * precioMineral);
        // console.log('totalActual', totalActual)
        // document.getElementsByClassName("form-input-total-venta")[0].value = totalActual;
        // document.getElementsByClassName('form-input-text-cantidad')[e.target.id].alt = cantidadActual;


        // const oldPrice = parseInt(document.getElementsByClassName("form-input-total-venta")[0].value);
        // console.log(oldPrice)
        // if (typeof oldPrice === 'number'){
        //     console.log('es un num')
        // }
        // const newTotal = oldPrice + this.state.minerales[e.target.value].precio;

        // document.getElementsByClassName("form-input-total-venta")[0].value = newTotal;






        // this.setState({total: this.state.total+precio})

        // const nombreMineral = this.state.minerales[e.target.value].nombre;
        // console.log('nombreM', nombreMineral); 
        // const nombrePresentacion = document.getElementsByClassName('form-input-dropdown-presentacion-venta')[e.target.id].value;
        // console.log('nombreP', nombrePresentacion); 

        // const indexOptionInDropdown = e.target.id;
        // const indexOptionInState = e.target.value;

        // const nombreMineral = this.state.minerales[indexOptionInDropdown].nombre;
        // console.log('nombreM', nombreMineral); 
        // const nombrePresentacion = document.getElementsByClassName('form-input-dropdown-presentacion-venta')[indexOptionInDropdown].value;
        // console.log('nombreP', nombrePresentacion); 

        // for (let i = 0; i < this.state.minerales.length; i++){
        //     console.log(this.state.minerales[i].nombre)
        //     if (this.state.minerales[i].nombre === nombreMineral){
        //         console.log(this.state.minerales[i].presentacion)
        //         if (this.state.minerales[i].presentacion === nombrePresentacion){
        //             console.log('entro')
        //             document.getElementsByClassName('form-input-text-precio-unitario')[e.target.id].value = this.state.minerales[i].precio;
        //         }
        //     }
        // }

        // setTimeout(function() {
            // const indexOptionInDropdown = e.target.id;
            // const indexOptionInState = e.target.value;

        //     console.log(indexOptionInDropdown);
        //     console.log(indexOptionInState);

            // const nombreMineral = self.state.minerales[indexOptionInState].nombre;
            // console.log(nombreMineral);
            // const nombrePresentacion = document.getElementsByClassName('form-input-dropdown-presentacion-venta')[0];
            // console.log(nombrePresentacion);

            // for (let i = 0; i < self.state.minerales.length; i++){
            //     // console.log(this.state.minerales[i].nombre)
            //     if (self.state.minerales[i].nombre === nombreMineral){
            //         // console.log(this.state.minerales[i].presentacion)
            //         if (self.state.minerales[i].presentacion === nombrePresentacion){
            //             // document.getElementsByClassName('form-input-text-precio-unitario')[indexOptionInDropdown].value = this.state.minerales[i].precio;
            //         }
            //     }
            // }
        // }, 3000);

        // <Form.Control 
        //                                 type="text" 
        //                                 className="form-input form-input-text-precio-unitario" 
        //                                 key={index}
        //                                 disabled={true}/>

        // console.log(document.getElementsByClassName('form-input-text-precio-unitario'));
        // console.log(document.getElementsByClassName('form-input-dropdown-mineral-venta'));
        // console.log(this.state.minerales[index].nombre);
    }
    onChangeCantidad = (e) => {
        console.log('epa', e);
        console.log('typeof e.target.value', typeof e.target.value);
        console.log('e.target.value', e.target.value);
        console.log('e.target.id', e.target.id);
        console.log('alt', document.getElementsByClassName('form-input-text-cantidad')[e.target.id].alt);
        let cantidadAnterior;
        let cantidadActual;

        // console.log(typeof document.getElementsByClassName('form-input-text-cantidad')[e.target.id].alt);
        

        if (!e.target.value || e.target.value.match(/^\d{1,}(\.\d{0,2})?$/)) {
            if (e.target.value.length > 0){
                console.log('>0')
                cantidadActual = document.getElementsByClassName('form-input-text-cantidad')[e.target.id].value;
            }
            else{
                cantidadActual = 0;
            }
    
            const precioMineral = document.getElementsByClassName('form-input-text-precio-unitario')[e.target.id].value;
            console.log('precioMin', precioMineral)
            cantidadAnterior = document.getElementsByClassName('form-input-text-cantidad')[e.target.id].alt;
            console.log('cantidadActual', cantidadActual)
            const totalAnterior = document.getElementsByClassName("form-input-total-venta")[0].value
            console.log('totalAnterior', totalAnterior)
            console.log('cantidadAnterior', cantidadAnterior)
            const totalActual = totalAnterior - (cantidadAnterior * precioMineral) + (cantidadActual * precioMineral);
            console.log('totalActual', Math.round(totalActual * 100) / 100)
            document.getElementsByClassName("form-input-total-venta")[0].value = Math.round(totalActual * 100) / 100;
            document.getElementsByClassName('form-input-text-cantidad')[e.target.id].alt = cantidadActual;
        }

    

        // console.log(document.getElementsByClassName('form-input-text-cantidad')[e.target.id].alt);

        // const cantidadAnterior = document.getElementsByClassName('form-input-text-cantidad')[e.target.id].alt;
        // const precioMineral = document.getElementsByClassName('form-input-text-precio-unitario')[e.target.id].value;
        // const cantidadActual = document.getElementsByClassName('form-input-text-cantidad')[e.target.id].value;
        // const totalAnterior = document.getElementsByClassName("form-input-total-venta")[0].value
        // const totalActual = totalAnterior - (cantidadAnterior * precioMineral) + (cantidadActual * precioMineral);
        // document.getElementsByClassName("form-input-total-venta")[0].value = totalActual;
        // document.getElementsByClassName('form-input-text-cantidad')[e.target.id].alt = cantidadActual;
        


        // document.getElementsByClassName('form-input-text-cantidad').setAttribute('oldValue', )

        
        // const cantidad = document.getElementsByClassName('form-input-text-cantidad')[e.target.id].value;
        // console.log('cantidad', cantidad);
        // console.log(precioMineral*cantidad);
        
        // document.getElementsByClassName("form-input-total-venta")[0].value = total;
        // document.getElementsByClassName('form-input-text-cantidad')[e.target.id].defaultValue = cantidad;

        // if (this.state.minerales[e.target.value]){
            // const precioMineral = document.getElementsByClassName('form-input-text-precio-unitario')[e.target.id].value;
            // const cantidad = document.getElementsByClassName('form-input-text-cantidad')[e.target.id].value;
            // console.log('cantidad', cantidad)
            // const precioTotalAnterior = parseInt(document.getElementsByClassName("form-input-total-venta")[0].value);
            // const nuevoTotal = precioTotalAnterior - precioMineralAnterior + this.state.minerales[e.target.id].precio;
            // document.getElementsByClassName("form-input-total-venta")[0].value = nuevoTotal;
            // console.log(precioMineral*cantidad);
        // }
    }
    createAttribute = (index) => {
        if (document.getElementsByClassName("form-input-text-cantidad")[index]){
            let inputField = document.getElementsByClassName("form-input-text-cantidad")[index];   // Get the first <h1> element in the document
            let att = document.createAttribute("oldValue");       // Create a "class" attribute
            att.value = 1;                           // Set the value of the class attribute
            inputField.setAttributeNode(att);
        }
    }
    getNombreMineral = (idPresentacion) => {
        let nombre;
        this.state.minerales.forEach((item) => {
            if (item.idBdPresentacionMineral === idPresentacion){
                nombre = item.nombre
            }
        })
        return nombre;
    }
    getNombrePresentacion = (idPresentacion) => {
        let nombre;
        this.state.minerales.forEach((item) => {
            // console.log('nombre idPresentacion-item.idBdPresentacionMineral',idPresentacion, item.idBdPresentacionMineral)
            if (item.idBdPresentacionMineral === idPresentacion){
                nombre = item.presentacion;
            }
        })
        return nombre;
    }
    renderPedido = () => {

        return this.state.pedidos.map((option, index) => {
            const nombreMineral = this.getNombreMineral(option.presentacion)
            const nombrePresentacion = this.getNombrePresentacion(option.presentacion)
            return (
                <Form.Row className="div-ventas-pedido-form" key={index} id={'form'+index}>
                    <Col md={6}>
                        <Row>
                            <Col md={5}>
                                <Form.Label className="cliente-description-fields-text">Mineral</Form.Label>
                                <Form.Control 
                                    type="text"
                                    key={index} 
                                    id={''+index}
                                    disabled={true}
                                    className="form-input form-input-dropdown-mineral-venta"
                                    value={nombreMineral}
                                >
                                </Form.Control>
                            </Col>
                            <Col md={5}>
                                <Form.Label className="cliente-description-fields-text">Presentación</Form.Label>
                                <Form.Control 
                                    type="text"
                                    key={index}
                                    id={''+index}
                                    disabled={true}
                                    className="form-input"
                                    value={nombrePresentacion}
                                >
                                </Form.Control>
                            </Col>
                            <Col md={2}></Col>
                        </Row>
                    </Col>
                    <Col md={6}>
                        <Row>
                            <Col md={5}>
                                <Form.Label className="cliente-description-fields-text">Cantidad</Form.Label>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group>
                                            <InputGroup className="MyInputGroup">
                                                <Form.Control type="number" 
                                                    className="form-input form-input-text-cantidad" 
                                                    key={index} 
                                                    value={option.cantidad}
                                                    id={''+index}
                                                    alt={1}
                                                    min="0"
                                                    disabled={true}
                                                />
                                                {
                                                    this.createAttribute(index)
                                                }
                                                <InputGroup.Append>
                                                    <InputGroup.Text className="input-append-ventas-form" key={index}>kg</InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={5}>
                                <Form.Label className="cliente-description-fields-text">Precio Unitario</Form.Label>
                                <Row>
                                    <Col md={10}>
                                        <Form.Control 
                                            type="number" 
                                            className="form-input form-input-text-precio-unitario" 
                                            key={index}
                                            disabled={true}
                                            value={option.precio}
                                        />
                                    </Col>
                                    <Col md={2}>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={2}></Col>
                        </Row>
                    </Col>
                </Form.Row>
            )
            
        })
    }
    onChangeNumber = (e) => {
        const number = e.target.value;

        if ((!number) || number.match(/^[0-9\b]+$/)){
            if (e.target.id === 'form-input-tipopagodetalle1-ventas'){
                this.setState({ detallePago1: e.target.value });
            }
            else if (e.target.id === 'form-input-tipopagodetalle2-ventas'){
                this.setState({ detallePago2: e.target.value });
            }
        }
    }
    renderTipoPagoDetallado = (index) => {
        const tipoPago = this.state.pagos[index].tipoPago
        // console.log('tipoPago', tipoPago)
        // console.log('this.state.pagos[index]', this.state.pagos[index].detalle1)

        if ((tipoPago === 'Transferencia') || (tipoPago === 'Cheque')){
            return (
                <Col md={4}>
                    <Form.Group>
                        <Form.Label className="cliente-description-fields-text">Número de Cuenta</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="form-input"
                            id="form-input-tipopagodetalle2-ventas" 
                            value={this.state.pagos[index].detalle2} 
                            disabled={true} 
                        />
                        <Form.Text className="text-muted">
                            Obligatorio
                        </Form.Text>
                    </Form.Group>
                </Col>
            )
        }
        else if (tipoPago === 'Tarjeta Crédito'){
            return (
                <Col md={4}>
                    <Form.Group>
                        <Form.Label className="cliente-description-fields-text">Tipo</Form.Label>
                        <Form.Control 
                            as="select" 
                            className="form-input"
                            id="form-input-tipopagodetalle2-ventas"
                            disabled={true}
                        >
                        <option>{this.state.pagos[index].detalle2}</option>
                        </Form.Control>
                        {
                            (this.state.showMessage2 === true && <p className="modal-bc-error-mg">¡Error! El cliente no está registrado en el sistema.</p>)
                        }
                    </Form.Group>
                </Col>
            )
        }

        // if (tiposDePagoLength === 1){
        //     if ((tiposDePago[0].value === 'Cheque') || tiposDePago[0].value === 'Transferencia'){
                // return (
                //     <Col md={5}>
                //         <Form.Group>
                //             <Form.Label className="cliente-description-fields-text">Número de Cuenta</Form.Label>
                //             <Form.Control 
                //                 type="text" 
                //                 className="form-input"
                //                 id="form-input-tipopagodetalle2-ventas" 
                //                 placeholder="Número de cuenta" 
                //                 onChange={this.onChangeNumber}  
                //                 value={this.state.detallePago2}  
                //             />
                //             <Form.Text className="text-muted">
                //                 Obligatorio
                //             </Form.Text> 
                //             {
                //                 (this.state.showMessage2 === true && <p className="modal-bc-error-mg">Este campo es obligatorio</p>)
                //             }
                //         </Form.Group>
                //     </Col>
                // )
        //     }
            // else if (tiposDePago[0].value === 'Tarjeta de Crédito'){
            //     return (
            //         <Col md={5}>
            //             <Form.Group>
            //                 <Form.Label className="cliente-description-fields-text">Tipo</Form.Label>
            //                 <Form.Control 
            //                     as="select" 
            //                     className="form-input"
            //                     id="form-input-tipopagodetalle2-ventas"
            //                     onChange={this.onChangeNumber}
            //                 >
            //                     <option>Visa</option>
            //                     <option>Master Card</option>
            //                 </Form.Control>
            //                 <Form.Text className="text-muted">
            //                     Obligatorio
            //                 </Form.Text> 
            //                 {
            //                     (this.state.showMessage2 === true && <p className="modal-bc-error-mg">¡Error! El cliente no está registrado en el sistema.</p>)
            //                 }
            //             </Form.Group>
            //         </Col>
            //     )
            // }
        // }
    }
    renderTipoPagoDetalle = (index) => {
        const tipoPago = this.state.pagos[index].tipoPago
        let colSize = 3;
        if (tipoPago === 'Tarjeta Débito'){
            colSize = 5
            console.log('colSize', colSize)
        }
        return (
            <div>
                <Row>
                    <Col md={2}></Col>
                    <Col md={10} className="div-detalle-tipo-pago">
                        <Row >
                        {
                            this.renderTipoPago(index)
                        }
                        {
                            this.renderTipoPagoDetallado(index)
                        }
                        {
                            colSize === 5 && <Col md={1}></Col>
                        }
                        <Col md={colSize}>
                            <Form.Label className="cliente-description-fields-text">Monto</Form.Label>
                            <Row>
                                <Col md={12}>
                                    <Form.Group>
                                        <InputGroup className="MyInputGroup">
                                            <Form.Control type="number" 
                                                className={"form-input form-input-text-monto-pago-detallado"+index} 
                                                key={index} 
                                                id={''+index}
                                                value={this.state.pagos[index].monto}
                                                disabled={true}
                                            />
                                        </InputGroup>
                                        {
                                            (this.state.showMessage2 === true && <p className="modal-bc-error-mg">Este campo es obligatorio</p>)
                                        }
                                    </Form.Group>
                                </Col>
                            </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
    renderTipoPagoInfo = () => {

        return (this.state.pagos.map((option, index) => (
            <div>
                <Row>
                    <Col md={2}></Col>
                    <Col md={10}>
                        <Row>
                            <Col md={11}>
                                <h5 className="horizontal-line-title-ventas-form cliente-title">Pago {index+1}</h5>
                            </Col>
                            <Col md={1}></Col>
                        </Row>
                    </Col>
                </Row>
                <Row key={index}>
                    <Col md={2}></Col>
                    <Col md={10}>
                        <Row key={index}>
                            <Col md={5}>
                                <Form.Label className="cliente-description-fields-text">Tipo de Pago</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    className="form-input form-input-dropdown-tipopago-venta"
                                    disabled={true}
                                    value={option.tipoPago}
                                    key={index}
                                >
                                </Form.Control>
                            </Col>
                            <Col md={1}></Col>
                            <Col md={5}>
                                <Form.Label className="cliente-description-fields-text">Banco</Form.Label>
                                <Form.Control 
                                    type="text"
                                    className="form-input form-input-dropdown-banco-venta"
                                    value={option.banco}
                                    key={index}
                                    disabled={true}
                                >
                                </Form.Control>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {this.renderTipoPagoDetalle(index)}
            </div>
        )))
    }
    goBack = () => {
        this.props.history.goBack()
    }
    renderTipoPago = (index) => {
        const tipoPago = this.state.pagos[index].tipoPago
        console.log('renderTipoPago')

        if (tipoPago === 'Cheque'){
            return (
                <Col md={4}>
                    <Form.Group>
                        <Form.Label className="cliente-description-fields-text">Número de Cheque</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="form-input"
                            id="form-input-tipopagodetalle1-ventas" 
                            disabled={true}
                            value={this.state.pagos[index].detalle1} 
                        />
                        {
                            (this.state.showMessage1 === true && <p className="modal-bc-error-mg">Este campo es obligatorio</p>)
                        }
                    </Form.Group>
                </Col>   
            )
        }
        else if (tipoPago === 'Tarjeta Débito'){
            return (
                <Col md={5} className="td-ventas-form">
                    <Form.Group>
                        <Form.Label className="cliente-description-fields-text">Número de Tarjeta</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="form-input"
                            id="form-input-tipopagodetalle1-ventas" 
                            disabled={true}
                            value={this.state.pagos[index].detalle1}
                        />
                        {
                            (this.state.showMessage1 === true && <p className="modal-bc-error-mg">Este campo es obligatorio</p>)
                        }
                    </Form.Group>
                </Col>
            )
        }
        else if (tipoPago === 'Tarjeta Crédito'){
            return (
                <Col md={4}>
                    <Form.Group>
                        <Form.Label className="cliente-description-fields-text">Número de Tarjeta</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="form-input"
                            id="form-input-tipopagodetalle1-ventas" 
                            disabled={true}
                            value={this.state.pagos[index].detalle1}
                        />
                        {
                            (this.state.showMessage1 === true && <p className="modal-bc-error-mg">Obligatorio</p>)
                        }
                    </Form.Group>
                </Col>
            )
        }
        else if (tipoPago === 'Transferencia'){
            return (
                <Col md={4}>
                    <Form.Group>
                        <Form.Label className="cliente-description-fields-text">Número de Referencia</Form.Label>
                        <Form.Control 
                            type="text" 
                            className="form-input"
                            id="form-input-tipopagodetalle1-ventas" 
                            disabled={true}
                            value={this.state.pagos[index].detalle1}
                        />
                        {
                            (this.state.showMessage1 === true && <p className="modal-bc-error-mg">Obligatorio</p>)
                        }
                    </Form.Group>
                </Col>
            )
        }
    }
    render(){

        return (
            <div className="contain pagecontent" id="Content">
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario={'Andrea Da Silva'}/>
                <Container className="pagecontent">
                    <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={11}>
                                    <h3 className="horizontal-line-title-ventas-form cliente-title">Detalle de Venta</h3>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={11}>
                                    <h4 className="horizontal-line-title-ventas-form cliente-title">Información de Venta</h4>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <Row className="div-content-form">
                            <Col md={2}></Col>
                            <Col md={10}>
                                <Form.Row>
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Estatus</Form.Label>
                                            {this.state.estatus && <Form.Control 
                                                as="select" 
                                                id="update-venta"
                                                defaultValue={this.state.estatus}
                                                onChange={(e) => this.onChangeModificarVenta(e)}
                                                className="form-input form-input-dropdown-presentacion-venta">
                                                <option value={7}>Procesada</option>
                                                <option value={8}>En Proceso</option>
                                            </Form.Control>}

                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="cliente-description-fields-text">Fecha</Form.Label>
                                            <Form.Control type="text" className="form-input" value={this.state.fecha} disabled={true} placeholder="Introduzca su primer apellido" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                </Form.Row>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={11}>
                                    <h4 className="horizontal-line-title-ventas-form cliente-title">Información del Cliente</h4>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <Row className="div-content-form">
                            <Col md={2}></Col>
                            <Col md={10}>
                                <Form.Row>
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Cédula de Identidad o RIF</Form.Label>
                                            <Form.Control type="text" className="form-input form-input-id" value={this.state.ci} disabled={true} placeholder="Introduzca su primer nombre" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="cliente-description-fields-text">Nombre del Cliente</Form.Label>
                                            <Form.Control type="text" className="form-input" value={this.state.nombre} disabled={true} placeholder="Introduzca su primer apellido" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                </Form.Row>
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={11}>
                                    <h4 className="horizontal-line-title-ventas-form cliente-title">Detalle de Pago</h4>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                    </Row>

                    {this.renderTipoPagoInfo()}

                    <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={11}>
                                    <h4 className="horizontal-line-title-ventas-form cliente-title">Detalle de Pedido</h4>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <Row className="div-content-form">
                            <Col md={2} ></Col>
                            <Col md={10}>
                            {
                                this.renderPedido()
                            }
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={11}>
                                    <h6 className="horizontal-line-ventas-form"></h6>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                    </Row>
                    
                    
                    <div>
                        <Row className="div-content-form div-content-form-end-rc">
                            <Col md={2}></Col>
                            <Col md={10}>
                                <Form.Row>
                                    <Col md={5}>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group>
                                            <Row>
                                                <Col md={4}>
                                                    <Form.Label className="cliente-description-fields-text">Total US $</Form.Label>
                                                </Col>
                                                <Col md={8}>
                                                    <Form.Control 
                                                        type="number"
                                                        min="0"
                                                        step=".01"
                                                        disabled={true}
                                                        className="form-input form-input-total-venta"
                                                        value={this.state.total}
                                                    />
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                </Form.Row>
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Row>
                            <Col md={2}></Col>
                            <Col md={10}>
                                <Row>
                                    <Col md={5}>
                                        <Button 
                                            className="ccargo-btn btn-block div-ventas-pedido-form"
                                            onClick={this.goBack}
                                        >
                                            Volver
                                        </Button>
                                    </Col>
                                    <Col md={2}></Col>
                                    <Col md={5}>
                                        <Button 
                                            className="modal-ventasform-enviar-button btn-block div-ventas-pedido-form"
                                            onClick={this.updateVenta}
                                        >
                                            Enviar
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        )
    }
}