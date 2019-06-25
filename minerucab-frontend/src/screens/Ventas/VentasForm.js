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
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

// https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input

export default class VentasForm extends React.Component {
    state = {
        prueba: true,
        nombre: '',
        ci: '',
        total: 0,
        minerales: [],
        pedido: [{
            mineral: "Oro",
            cantidad: 0
        }],
        detallePago1: '',
        detallePago2: '',
        showMessage1: false,
        showMessage2: false
    }
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
            axios.get(`http://localhost:3000/getClienteById/${this.props.match.params.id[1]}`, config)
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
            axios.get(`http://localhost:3000/getClienteJuridicoById/${this.props.match.params.id[1]}`, config)
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
        else if ((this.state.detallePago2 === '') && (document.getElementsByClassName('form-input-dropdown-tipopago-venta')[0].value !== 'Tarjeta de Crédito') && (document.getElementsByClassName('form-input-dropdown-tipopago-venta')[0].value !== 'Tarjeta de Débito')){
            console.log('entro')
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
    
            console.log("venta", venta)

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
            history.push('/venta');
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
        console.log('index', indexF)
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
            console.log('elimino')
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

        if ((!number) || number.match(/^[0-9\b]+$/)){
            if (e.target.id === 'form-input-tipopagodetalle1-ventas'){
                this.setState({ detallePago1: e.target.value });
            }
            else if (e.target.id === 'form-input-tipopagodetalle2-ventas'){
                this.setState({ detallePago2: e.target.value });
            }
        }
    }
    renderTipoPagoDetallado = () => {
        const tiposDePagoLength = document.getElementsByClassName('form-input-dropdown-tipopago-venta').length
        const tiposDePago = document.getElementsByClassName('form-input-dropdown-tipopago-venta')

        if (tiposDePagoLength === 1){
            if ((tiposDePago[0].value === 'Cheque') || tiposDePago[0].value === 'Transferencia'){
                return (
                    <Col md={5}>
                        <Form.Group>
                            <Form.Label className="cliente-description-fields-text">Número de Cuenta</Form.Label>
                            <Form.Control 
                                type="text" 
                                className="form-input"
                                id="form-input-tipopagodetalle2-ventas" 
                                placeholder="Número de cuenta" 
                                onChange={this.onChangeNumber}  
                                value={this.state.detallePago2}  
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
            else if (tiposDePago[0].value === 'Tarjeta de Crédito'){
                return (
                    <Col md={5}>
                        <Form.Group>
                            <Form.Label className="cliente-description-fields-text">Tipo</Form.Label>
                            <Form.Control 
                                as="select" 
                                className="form-input"
                                id="form-input-tipopagodetalle2-ventas"
                                onChange={this.onChangeNumber}
                            >
                                <option>Visa</option>
                                <option>Master Card</option>
                            </Form.Control>
                            <Form.Text className="text-muted">
                                Obligatorio
                            </Form.Text> 
                            {
                                (this.state.showMessage2 === true && <p className="modal-bc-error-mg">¡Error! El cliente no está registrado en el sistema.</p>)
                            }
                        </Form.Group>
                    </Col>
                )
            }
        }
    }
    renderTipoPago = () => {
        const tiposDePagoLength = document.getElementsByClassName('form-input-dropdown-tipopago-venta').length
        const tiposDePago = document.getElementsByClassName('form-input-dropdown-tipopago-venta')

        if (tiposDePagoLength === 1){
            if (tiposDePago[0].value === 'Cheque'){
                return (
                    <Col md={5}>
                        <Form.Group>
                            <Form.Label className="cliente-description-fields-text">Número de Cheque</Form.Label>
                            <Form.Control 
                                type="text" 
                                className="form-input"
                                id="form-input-tipopagodetalle1-ventas" 
                                placeholder="Número de cheque" 
                                onChange={this.onChangeNumber}
                                value={this.state.detallePago1}
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
            else if (tiposDePago[0].value === 'Tarjeta de Débito'){
                return (
                    <Col md={5} className="td-ventas-form">
                        <Form.Group>
                            <Form.Label className="cliente-description-fields-text">Número de Tarjeta</Form.Label>
                            <Form.Control 
                                type="text" 
                                className="form-input"
                                id="form-input-tipopagodetalle1-ventas" 
                                placeholder="Número de tarjeta" 
                                onChange={this.onChangeNumber} 
                                value={this.state.detallePago1}   
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
            else if (tiposDePago[0].value === 'Tarjeta de Crédito'){
                return (
                    <Col md={5}>
                        <Form.Group>
                            <Form.Label className="cliente-description-fields-text">Número de Tarjeta</Form.Label>
                            <Form.Control 
                                type="text" 
                                className="form-input"
                                id="form-input-tipopagodetalle1-ventas" 
                                placeholder="Número de tarjeta" 
                                onChange={this.onChangeNumber}
                                value={this.state.detallePago1}    
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
            else if (tiposDePago[0].value === 'Transferencia'){
                return (
                    <Col md={5}>
                        <Form.Group>
                            <Form.Label className="cliente-description-fields-text">Número de Referencia</Form.Label>
                            <Form.Control 
                                type="text" 
                                className="form-input"
                                id="form-input-tipopagodetalle1-ventas" 
                                placeholder="Número de referencia"
                                onChange={this.onChangeNumber}
                                value={this.state.detallePago1}
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
    }
    goBack = () => {
        history.goBack()
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
                                    <h4 className="horizontal-line-title-ventas-form cliente-title">Detalle de Venta</h4>
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
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Información del Cliente</h6>
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
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Detalle de Pago</h6>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                    </Row>

                    <div>
                        <Row >
                            <Col md={2}></Col>
                            <Col md={10}>
                                <Row >
                                    <Col md={5}>
                                        <Form.Label className="cliente-description-fields-text">Tipo de Pago</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            className="form-input form-input-dropdown-tipopago-venta"
                                            onChange={() => this.setState(() => ({
                                                prueba: false
                                            }))}
                                        >
                                            <option>Cheque</option>
                                            <option>Tarjeta de Crédito</option>
                                            <option>Tarjeta de Débito</option>
                                            <option>Transferencia</option>
                                        </Form.Control>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Label className="cliente-description-fields-text">Banco</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            className="form-input form-input-dropdown-banco-venta"
                                        >
                                            <option>Banesco</option>
                                            <option>Mercantil</option>
                                            <option>Provincial</option>
                                        </Form.Control>
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
                                    this.renderTipoPago()
                                }
                                <Col md={1}></Col>
                                {
                                    this.renderTipoPagoDetallado()
                                }
                                </Row>
                            </Col>
                        </Row>
                    </div>

                    

                    <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={11}>
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Detalle de Pedido</h6>
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
                                            className="ccargo-btn btn-block div-ventas-pedido-form"
                                            onClick={this.goBack}
                                        >
                                            Volver
                                        </Button>
                                    </Col>
                                    <Col md={2}></Col>
                                    <Col md={5}>
                                        <Button 
                                            className="ccargo-btn btn-block div-ventas-pedido-form"
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