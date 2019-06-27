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
import {history} from '../../routers/History';
import ModalAdvertencia from '../../components/ModalAdvertencia';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

// https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input

export default class VentasForm extends React.Component {
    state = {
        prueba: true,
        nombre: '',
        ci: '',
        total: 0,
        pagosBorrados: [],
        minerales: [],
        pedido: [{
            mineral: "Oro",
            cantidad: 0
        }],
        pagos: [{
            tipoPago: '',
            cantidad: 0
        }],
        detallePago1: '',
        detallePago2: [],
        showMessage1: false,
        showMessage2: false,
        mensajeError: '',
        modalShowEliminar: false
    }
    modalErrorClose = () => {
        this.setState({ modalShowEliminar: false, reload: true });
    }
    modalErrorOpen = () => {
        this.setState({ modalShowEliminar: true })
    };
    componentDidMount = () => {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            },
            responseType: 'json'
        }
        axios.get('http://localhost:3000/getAllMineralesMetalicosConPresentacion', config)
            .then((res) => {
                console.log(res)
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
                    this.setState((prevState) => ({
                        minerales: prevState.minerales.concat(mineralInfo)
                    }));
                })
            }).catch((e) => {
                console.log('Error en axios')
            })

            axios.get('http://localhost:3000/getAllMineralesNoMetalicosConPresentacion', config)
            .then((res) => {
                console.log(res)
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
        
        if ((this.props.match.params.id[0] === 'V') || (this.props.match.params.id[0] === 'E')){
            axios.get(`http://localhost:3000/getClienteById/${this.props.match.params.id.slice(1)}`, config)
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
            axios.get(`http://localhost:3000/getClienteJuridicoById/${this.props.match.params.id.slice(1)}`, config)
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
    
    }
    dropdownChange = (e, indexMap) => {
        const nombreMineral = this.state.minerales[e.target.value].nombre;
        console.log('nombreMineral', nombreMineral)
        this.setState({pedido: [
            ...this.state.pedido.filter((item, index) => index !== indexMap),
            { mineral: nombreMineral }
       ]})
        
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
        // console.log('on sub', document.getElementsByClassName('form-input-total-venta')[0].value)
        
        // console.log(this.props.match.params.id.slice(1))

        let pedidos = [];

        const numPedidos = document.getElementsByClassName('form-input-dropdown-mineral-venta').length
    
        for (let i = 0; i < numPedidos; i++){
            const indexInState = document.getElementsByClassName('form-input-dropdown-mineral-venta')[i].value

            let pedido = {
                idPresentacionMineral: this.state.minerales[indexInState].idBdPresentacionMineral,
                cantidad: document.getElementsByClassName('form-input-text-cantidad')[i].value,
                precio: document.getElementsByClassName('form-input-text-precio-unitario')[i].value
            }
            
            console.log('pedido', pedido)

            pedidos.push(pedido)
        }


        let pagos = [];

        let total = 0;

        let continuar = true

        for (let i = 0; i < this.state.pagos.length; i++){
            if ((!this.state.pagosBorrados.includes(i))){
                console.log('detalle1', document.getElementById('form-input-tipopagodetalle1-ventas'+i).value)
                let pago = {
                    tipo: document.getElementsByClassName('form-input-dropdown-tipopago-venta'+i)[0].value,
                    banco: document.getElementsByClassName('form-input-dropdown-banco-venta'+i)[0].value,
                    detalle: {
                        detalle1: document.getElementById('form-input-tipopagodetalle1-ventas'+i).value,
                        detalle2: ''
                    },
                    monto: document.getElementsByClassName('form-input-text-monto-pago-detallado'+i)[0].value
                }

                if (document.getElementById('form-input-tipopagodetalle1-ventas'+i).value === ''){
                    continuar = false;
                    this.setState({ mensajeError: 'Existen campos obligatorios vacíos' })
                    this.modalErrorOpen()
                }

                if (pago.tipo !== 'Tarjeta de Débito'){
                    if (document.getElementById('form-input-tipopagodetalle2-ventas'+i).value !== ''){
                        pago.detalle.detalle2 = document.getElementById('form-input-tipopagodetalle2-ventas'+i).value
                    }
                    else {
                        continuar = false;
                        this.setState({ mensajeError: 'Existen campos obligatorios vacíos' })
                        this.modalErrorOpen()
                    }
                }

                total += parseFloat(pago.monto);
                console.log('total', total)

                pagos.push(pago);
            }
        }

        console.log('pagos', pagos);

        let venta = {
            idCliente: this.props.match.params.id.slice(1),
            tipoCliente: document.getElementsByClassName('form-input-id')[0].value,
            pagos: pagos,
            pedidos: pedidos,
            total: document.getElementsByClassName('form-input-total-venta')[0].value
        }

        if (parseFloat(total) !== parseFloat(venta.total)){
            console.log('no son iguales', parseFloat(total), parseFloat(venta.total))
            this.setState({ mensajeError: 'El monto total no coincide con el monto pagado por el usuario' })
            this.modalErrorOpen()
            continuar = false;
        }
        else {
            console.log('son iguales')
        }

        if (continuar){
            console.log('continuar', venta)
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
                    history.push('/venta')
                }).catch((e) => {
                    console.log('Error en axios')
                })
            
            // setTimeout(function(){ history.push('/venta'); }, 1000);
        }



        // console.log('pedidos', pedidos)
    

        // let venta = {
        //     idCliente: this.props.match.params.id[1],
        //     tipoCliente: document.getElementsByClassName('form-input-id')[0].value,
        //     pagos: [{
        //         tipo: document.getElementsByClassName('form-input-dropdown-tipopago-venta')[0].value,
        //         banco: document.getElementsByClassName('form-input-dropdown-banco-venta')[0].value,
        //         detalle: {
        //             detalle1: this.state.detallePago1,
        //             detalle2: detalle2
        //         },
        //         monto: document.getElementsByClassName('form-input-total-venta')[0].value
        //     }],
        //     pedidos: [],
        //     total: document.getElementsByClassName('form-input-total-venta')[0].value
        // }


        //              FUNCIONA        

        // if (this.state.detallePago1 === ''){
        //     this.setState(() => ({
        //         showMessage1: true
        //     }))
        //     if (this.state.detallePago2 === ''){
        //         console.log(document.getElementsByClassName('form-input-dropdown-tipopago-venta')[0].value)
        //         if (document.getElementsByClassName('form-input-dropdown-tipopago-venta')[0].value !== 'Tarjeta de Crédito'){
        //             this.setState(() => ({
        //                 showMessage2: true
        //             }))
        //         }
        //     }
        // }
        // else if ((this.state.detallePago2 === '') && (document.getElementsByClassName('form-input-dropdown-tipopago-venta')[0].value !== 'Tarjeta de Crédito') && (document.getElementsByClassName('form-input-dropdown-tipopago-venta')[0].value !== 'Tarjeta de Débito')){
        //     console.log('entro')
        //     if (this.state.detallePago2 === ''){
        //         this.setState(() => ({
        //             showMessage2: true
        //         }))
        //     }
        //     else{
        //         this.setState(() => ({
        //             showMessage2: false
        //         }))
        //     }
        // }
        // else {
        //     this.setState(() => ({
        //         showMessage2: false
        //     }))
        //     this.setState(() => ({
        //         showMessage1: false
        //     }))

        //     console.log('detalle2', detalle2)

            // let venta = {
            //     idCliente: this.props.match.params.id[1],
            //     tipoCliente: document.getElementsByClassName('form-input-id')[0].value,
            //     pagos: [{
            //         tipo: document.getElementsByClassName('form-input-dropdown-tipopago-venta')[0].value,
            //         banco: document.getElementsByClassName('form-input-dropdown-banco-venta')[0].value,
            //         detalle: {
            //             detalle1: this.state.detallePago1,
            //             detalle2: detalle2
            //         },
            //         monto: document.getElementsByClassName('form-input-total-venta')[0].value
            //     }],
            //     pedidos: [],
            //     total: document.getElementsByClassName('form-input-total-venta')[0].value
            // }

            // const numPedidos = document.getElementsByClassName('form-input-dropdown-mineral-venta').length
    
            // for (let i = 0; i < numPedidos; i++){
            //     const indexInState = document.getElementsByClassName('form-input-dropdown-mineral-venta')[i].value
    
            //     let pedido = {
            //         idPresentacionMineral: this.state.minerales[indexInState].idBdPresentacionMineral,
            //         cantidad: document.getElementsByClassName('form-input-text-cantidad')[i].value,
            //         precio: document.getElementsByClassName('form-input-text-precio-unitario')[i].value
            //     }
    
            //     // tipoMineral: 'metalico',
            //     // idBdPresentacionMineral: '',
            //     // nombre: '',
            //     // presentacion: '',
            //     // precio: 0
    
            //     venta.pedidos.push(pedido)
            //     console.log('pedido', pedido)
    
        //     }
    
        //     console.log(venta)







            // const config = {
            //     headers: {
            //       'Content-Type': 'application/x-www-form-urlencoded'
            //     },
            //     responseType: 'json',
            //     data: venta
            // }
            
            // axios.post('http://localhost:3000/createVenta', config)
            //     .then((res) => {
            //         console.log(res)
            //     }).catch((e) => {
            //         console.log('Error en axios')
            //     })
            
            // setTimeout(function(){ history.push('/venta'); }, 1000);
        // }
        
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
        console.log('e', e);
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
    deleteItem = (elementIndex) => {
        console.log('state inicial', this.state.pedido)
        console.log('delete item', elementIndex)
        this.setState({pedido: this.state.pedido.filter((item, index) => {
            if (index !== elementIndex){
                console.log('index', index)
                console.log('elementIndex', elementIndex)
                return true
            }
            else{
                console.log('iguales')
                return false
            }

            })})
        // let array = [...this.state.pedido]; // make a separate copy of the array
        if (elementIndex !== -1) {
            // console.log('elimino')
            // array.splice(elementIndex, 1);
            // console.log('array', array)
            // this.setState((prevState) => ({
            //     pedido: prevState.pedido.filter((index) => elementIndex !== index),
            //     prueba: false
            // }));
            // console.log('state final', this.state.pedido)
        }
    }
    renderPedido = () => {

        return this.state.pedido.map((option, index) => {
            return (
                <Form.Row className="div-ventas-pedido-form" key={index} id={'form'+index}>
                    <Col md={6}>
                        <Row>
                            <Col md={5}>
                                <Form.Label className="cliente-description-fields-text">Mineral</Form.Label>
                                <Form.Control 
                                    as="select" 
                                    key={index} 
                                    onChange={(e) => this.dropdownChange(e, index)} 
                                    id={''+index}
                                    className="form-input form-input-dropdown-mineral-venta">
                                    {
                                        this.renderOptions('mineral')
                                    }
                                </Form.Control>
                            </Col>
                            <Col md={5}>
                                <Form.Label className="cliente-description-fields-text">Presentación</Form.Label>
                                <Form.Control 
                                    as="select" 
                                    key={index}
                                    id={''+index}
                                    onChange={this.renderPrecioUnitario}
                                    className="form-input form-input-dropdown-presentacion-venta">
                                    {
                                        this.renderOptions('presentacion', index)
                                    }
                                </Form.Control>
                            </Col>
                            <Col md={1}></Col>
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
                                                    defaultValue={1}
                                                    id={''+index}
                                                    onChange={this.onChangeCantidad}
                                                    alt={1}
                                                    min="0"
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
                                <Form.Text className="text-muted">
                                    Obligatorio
                                </Form.Text>
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
                                            defaultValue={this.state.minerales[0] && this.state.minerales[0].precio}
                                        />
                                    </Col>
                                    <Col md={2}>
                                    </Col>
                                </Row>
                                <Form.Text className="text-muted">
                                    Obligatorio
                                </Form.Text>
                            </Col>
                            <Col md={2}>
                            </Col>
                        </Row>
                    </Col>
                </Form.Row>
            )
            
        })
    }
    onChangeNumber = (e) => {
        const number = e.target.value;
        console.log('number', number)

        if ((!number) || number.match(/^[0-9\b]+$/)){
            if (e.target.id === 'form-input-tipopagodetalle1-ventas'){
                this.setState({ detallePago1: e.target.value });
            }
            else if (e.target.id === 'form-input-tipopagodetalle2-ventas'){
                this.setState({ detallePago2: e.target.value });
            }
        }
        else if ((document.getElementsByClassName('form-input form-input-dropdown-tipopago-venta')[0].value === 'Tarjeta de Crédito') && (e.target.id === 'form-input-tipopagodetalle2-ventas')){
            // console.log('entro this state 2')
            this.setState({ detallePago2: e.target.value });
            // console.log('this.state.detallePago2', e.target.value)
            // console.log('value tc', document.getElementById('form-input-tipopagodetalle2-ventas')[0].value)
        }
    }
    handleOnChangeValidarNumeros=(event,Texto)=>{
        console.log('valida')
        const value = event.target.value;
        const valueTrimmed = value.trim();
        const minerales= this.state.Minerales;

        if(valueTrimmed){
            event.target.state='valid';
            

            if(!isNaN(valueTrimmed) && (Number(valueTrimmed)>0)  ){
                document.getElementById(Texto).innerHTML = "Obligatorio";
                
            }
            else{
                
                document.getElementById(Texto).innerHTML = "Introduzca un número válido";
               
            }
           
        }
        else{
            event.target.state='invalid';
            document.getElementById(Texto).innerHTML = "Introduzca un número válido";
            console.log("invalido");
        }
        
        if(!value){
            event.target.state='';
            document.getElementById(Texto).innerHTML = "Obligatorio";
           
        }
    }
    renderTipoPagoDetallado = (index) => {
        let tiposDePagoLength = document.getElementsByClassName('form-input-dropdown-tipopago-venta').length
        let tiposDePago = document.getElementsByClassName('form-input-dropdown-tipopago-venta'+index)
        // console.log('renderTipoPagoDetallado', index)
        // console.log('doc', document.getElementsByClassName('form-input-dropdown-tipopago-venta')[index])
        // console.log('document.getElementsByClassName(form-input-dropdown-tipopago-venta)[index]', document.getElementsByClassName('form-input-dropdown-tipopago-venta'+index))
        if (document.getElementsByClassName('form-input-dropdown-tipopago-venta'+index)[0]){
            // console.log(tiposDePago[0].value)
            tiposDePago = document.getElementsByClassName('form-input-dropdown-tipopago-venta'+index)[0].value
            // console.log('tiposDePagoDetallado-tiposDePago', tiposDePago)
            if (document.getElementsByClassName('form-input-dropdown-tipopago-venta'+index)[0]){
                // console.log('doc', document.getElementsByClassName('form-input-dropdown-tipopago-venta'+index).value)
            }
            if ((tiposDePago === 'Cheque') || tiposDePago === 'Transferencia'){
                return (
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label className="cliente-description-fields-text">Número de Cuenta</Form.Label>
                            <Form.Control 
                                type="number" 
                                className="form-input form-input-tipopagodetalle2-ventas"
                                id={"form-input-tipopagodetalle2-ventas"+index} 
                                placeholder="Número de cuenta" 
                                onChange={(e) => this.handleOnChangeValidarNumeros(e, 'form-input-tipopagodetalle2-ventas'+index)}   
                                min="0"
                                step=".01"
                            />
                            <Form.Text className="text-muted">
                                Obligatorio
                            </Form.Text> 
                            {
                                (this.state.showMessage2 === true && <p className="modal-bc-error-mg">Este campo es obligatorio</p>)
                            }
                        </Form.Group>
                    </Col>
                )
            }
            else if (tiposDePago === 'Tarjeta de Crédito'){
                return (
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label className="cliente-description-fields-text">Tipo</Form.Label>
                            <Form.Control 
                                as="select" 
                                className="form-input form-input-tipopagodetalle2-ventas"
                                id={"form-input-tipopagodetalle2-ventas"+index}
                            >
                                <option>Visa</option>
                                <option>Master Card</option>
                            </Form.Control>
                            <Form.Text className="text-muted">
                                Obligatorio
                            </Form.Text> 
                            {
                                (this.state.showMessage2 === true && <p className="modal-bc-error-mg">Este campo es obligatorio</p>)
                            }
                        </Form.Group>
                    </Col>
                )
            }
        }
        else {
            return (
                <Col md={3}>
                    <Form.Group>
                        <Form.Label className="cliente-description-fields-text">Número de Cuenta</Form.Label>
                        <Form.Control 
                            type="number" 
                            className="form-input form-input-tipopagodetalle2-ventas"
                            id={"form-input-tipopagodetalle2-ventas"+index}
                            placeholder="Número de cuenta" 
                            onChange={(e) => this.handleOnChangeValidarNumeros(e, 'form-input-tipopagodetalle2-ventas'+index)} 
                            min="0"  
                        />
                        <Form.Text className="text-muted">
                            Obligatorio
                        </Form.Text> 
                        {
                            (this.state.showMessage2 === true && <p className="modal-bc-error-mg">Este campo es obligatorio</p>)
                        }
                    </Form.Group>
                </Col>
            )
        }
    }
    renderTipoPago = (index) => {
        let tiposDePago
        const tiposDePagoLength = document.getElementsByClassName('form-input-dropdown-tipopago-venta').length
        
        // console.log('tiposDePago-index', tiposDePago[index])

        // console.log('onChange', document.getElementsByClassName('form-input-dropdown-tipopago-venta')[index].value)

        if (document.getElementsByClassName('form-input-dropdown-tipopago-venta'+index)[0]){
            
            tiposDePago = document.getElementsByClassName('form-input-dropdown-tipopago-venta'+index)[0].value
            if (document.getElementsByClassName('form-input-dropdown-tipopago-venta'+index).value){
                console.log('doc', document.getElementsByClassName('form-input-dropdown-tipopago-venta'+index).value)
            }
            if (tiposDePago === 'Cheque'){
                return (
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label className="cliente-description-fields-text">Número de Cheque</Form.Label>
                            <Form.Control 
                                type="number" 
                                className="form-input"
                                id={"form-input-tipopagodetalle1-ventas"+index} 
                                placeholder="Número de cheque" 
                                onChange={(e) => this.handleOnChangeValidarNumeros(e, 'form-input-tipopagodetalle1-ventas'+index)} 
                                min="0"
                                step=".01"
                            />
                            <Form.Text className="text-muted">
                                Obligatorio
                            </Form.Text> 
                            {
                                (this.state.showMessage1 === true && <p className="modal-bc-error-mg">Este campo es obligatorio</p>)
                            }
                        </Form.Group>
                    </Col>   
                )
            }
            else if (tiposDePago === 'Tarjeta de Débito'){
                return (
                    <Col md={4} className="td-ventas-form">
                        <Form.Group>
                            <Form.Label className="cliente-description-fields-text">Número de Tarjeta</Form.Label>
                            <Form.Control 
                                type="number" 
                                className="form-input"
                                id={"form-input-tipopagodetalle1-ventas"+index} 
                                placeholder="Número de tarjeta" 
                                onChange={(e) => this.handleOnChangeValidarNumeros(e, 'form-input-tipopagodetalle1-ventas'+index)} 
                                min="0"
                                step=".01"
                            />
                            <Form.Text className="text-muted">
                                Obligatorio
                            </Form.Text> 
                            {
                                (this.state.showMessage1 === true && <p className="modal-bc-error-mg">Este campo es obligatorio</p>)
                            }
                        </Form.Group>
                    </Col>
                )
            }
            else if (tiposDePago=== 'Tarjeta de Crédito'){
                return (
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label className="cliente-description-fields-text">Número de Tarjeta</Form.Label>
                            <Form.Control 
                                type="number" 
                                className="form-input"
                                id={"form-input-tipopagodetalle1-ventas"+index} 
                                placeholder="Número de tarjeta" 
                                onChange={(e) => this.handleOnChangeValidarNumeros(e, 'form-input-tipopagodetalle1-ventas'+index)} 
                                min="0"  
                                step=".01"
                            />
                            <Form.Text className="text-muted">
                                Obligatorio
                            </Form.Text> 
                            {
                                (this.state.showMessage1 === true && <p className="modal-bc-error-mg">Este campo es obligatorio</p>)
                            }
                        </Form.Group>
                    </Col>
                )
            }
            else if (tiposDePago === 'Transferencia'){
                return (
                    <Col md={3}>
                        <Form.Group>
                            <Form.Label className="cliente-description-fields-text">Número de Referencia</Form.Label>
                            <Form.Control 
                                type="number" 
                                className="form-input"
                                id={"form-input-tipopagodetalle1-ventas"+index} 
                                placeholder="Número de referencia"
                                onChange={(e) => this.handleOnChangeValidarNumeros(e, 'form-input-tipopagodetalle1-ventas'+index)} 
                                min="0"
                                step=".01"
                            />
                            <Form.Text className="text-muted">
                                Obligatorio
                            </Form.Text> 
                            {
                                (this.state.showMessage1 === true && <p className="modal-bc-error-mg">Este campo es obligatorio</p>)
                            }
                        </Form.Group>
                    </Col>
                )
            }
        }
        else {
            return (
                <Col md={3}>
                    <Form.Group>
                        <Form.Label className="cliente-description-fields-text">Número de Cheque</Form.Label>
                        <Form.Control 
                            type="number" 
                            className="form-input"
                            id={"form-input-tipopagodetalle1-ventas"+index} 
                            placeholder="Número de cheque" 
                            onChange={(e) => this.handleOnChangeValidarNumeros(e, 'form-input-tipopagodetalle1-ventas'+index)} 
                            min="0"
                            step=".01"
                        />
                        <Form.Text className="text-muted">
                            Obligatorio
                        </Form.Text> 
                        {
                            (this.state.showMessage1 === true && <p className="modal-bc-error-mg">Este campo es obligatorio</p>)
                        }
                    </Form.Group>
                </Col>   
            )
        }
    }
    goBack = () => {
        history.goBack()
    }
    deletePago = (index) => {
        console.log('index deletePago', index)
        this.setState((prevState) => ({
            pagosBorrados: prevState.pagosBorrados.concat(index)
        }));
    }
    renderPagos = () => {
        let numero = 0;
        let pagosDisponibles = this.state.pagos.length - this.state.pagosBorrados.length
        const disable = pagosDisponibles > 1 ? false : true;
        return this.state.pagos.map((item, index) => {
            if (!this.state.pagosBorrados.includes(index)){
                numero++;
             return (<div>
                <div>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={11}>
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Pago {numero}</h6>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="div-detalle-tipo-pago-especifico">
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row >
                                <Col md={5}>
                                    <Form.Label className="cliente-description-fields-text">Tipo de Pago</Form.Label>
                                    <Form.Control 
                                        as="select" 
                                        className={"form-input form-input-dropdown-tipopago-venta"+index}
                                        key={index}
                                        id={''+index}
                                        defaultValue="Cheque"
                                        onChange={() => this.setState(() => ({
                                            prueba: false
                                        }))}
                                    >
                                        <option value="Cheque">Cheque</option>
                                        <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                                        <option value="Tarjeta de Débito">Tarjeta de Débito</option>
                                        <option value="Transferencia">Transferencia</option>
                                    </Form.Control>
                                </Col>
                                <Col md={1}></Col>
                                <Col md={5}>
                                    <Form.Label className="cliente-description-fields-text">Banco</Form.Label>
                                    <Form.Control 
                                        as="select" 
                                        className={"form-input form-input-dropdown-banco-venta"+index}
                                        key={index}
                                        id={''+index}
                                    >
                                        <option>BanCaribe</option>
                                        <option>Banco Activo</option>
                                        <option>Banco Caroní</option>
                                        <option>Banco de Venezuela</option>
                                        <option>Banco Exterior</option>
                                        <option>Banco Mercantil</option>
                                        <option>Banesco</option>
                                        <option>BBVA</option>
                                        <option>BNC</option>
                                        <option>BOD</option>
                                    </Form.Control>
                                </Col>
                                <Col md={1}>
                                <Button
                                    variant="outline-danger"
                                    className="btn-block"
                                    disabled={disable}
                                    onClick={() => this.deletePago(index)}
                                >
                                    X
                                </Button>
                            </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>

                <div>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={10} className="div-detalle-tipo-pago">
                            <Row >
                            {
                                this.renderTipoPago(index)
                            }
                            <Col md={1}></Col>
                            {
                                this.renderTipoPagoDetallado(index)
                            }
                            <Col md={1}></Col>
                            <Col md={3}>
                                <Form.Label className="cliente-description-fields-text">Monto</Form.Label>
                                <Row>
                                    <Col md={12}>
                                        <Form.Group>
                                            <InputGroup className="MyInputGroup">
                                                <Form.Control type="number" 
                                                    className={"form-input form-input-text-monto-pago-detallado"+index} 
                                                    key={index} 
                                                    id={''+index}
                                                    min="0"
                                                />
                                            </InputGroup>
                                            {
                                                (this.state.showMessage2 === true && <p className="modal-bc-error-mg">Este campo es obligatorio</p>)
                                            }
                                        </Form.Group>
                                        <Form.Text className="text-muted">
                                            Obligatorio
                                        </Form.Text>
                                    </Col>
                                </Row>
                            </Col>
                            </Row>
                        </Col>
                    </Row>
                    
                </div>

            </div>
        )}})
    }
    addPago = () => {
        const pago = {
            tipoPago: '',
            cantidad: 0
        };

        this.setState((prevState) => ({
            pagos: prevState.pagos.concat(pago)
        }));
    }

    render(){

        return (
            <div className="contain pagecontent" id="Content">
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario={'Andrea Da Silva'}/>
                <Container className="pagecontent">
                <ModalAdvertencia
                    show={this.state.modalShowEliminar}
                    onHide={this.modalErrorClose}
                    infoeliminar={this.state.mensajeError}
                    mensaje={''}
                />
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
                                    <h5 className="horizontal-line-title-ventas-form cliente-title">Información del Cliente</h5>
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
                                        <Form.Group>
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
                                    <h5 className="horizontal-line-title-ventas-form cliente-title">Detalle de Pago</h5>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                    </Row>

                    <div>
                        {this.renderPagos()}
                    </div>

                    <div>
                        <Row className="div-content-form div-content-form-end-rc">
                            <Col md={2}></Col>
                            <Col md={10}>
                                <Row>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Button 
                                            className="ventas-form-btn btn-block"
                                            onClick={this.addPago}
                                        >
                                            Agregar
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>

                    

                    <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={11}>
                                    <h5 className="horizontal-line-title-ventas-form cliente-title">Detalle de Pedido</h5>
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
                                    <h5 className="horizontal-line-ventas-form"></h5>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <Row className="div-content-form div-content-form-end-rc">
                            <Col md={2}></Col>
                            <Col md={10}>
                                <Row>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Button 
                                            className="ventas-form-btn btn-block"
                                            onClick={this.addPedido}
                                        >
                                            Agregar
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    
                    
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
                                                        defaultValue={this.state.minerales[0] && this.state.minerales[0].precio}
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
                                            className="modal-ventasform-volver-button btn-block div-ventas-pedido-form"
                                            onClick={this.goBack}
                                        >
                                            Volver
                                        </Button>
                                    </Col>
                                    <Col md={2}></Col>
                                    <Col md={5}>
                                        <Button 
                                            className="modal-ventasform-enviar-button btn-block div-ventas-pedido-form"
                                            onClick={this.onSubmit}
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