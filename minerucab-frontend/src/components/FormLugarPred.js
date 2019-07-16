import React from 'react';
import axios from 'axios';
import FormTitulo from '../components/FormTitulo'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import $ from 'jquery'

export default class FormLugarPred extends React.Component {
    state = {
        estados: [],
        municipios: [],
        parroquias: [],
        estadoSel: '',
        municipioSel: '',
        parroquiaSel: '',
        estadoCO: '',
        municipioCO: '',
        parroquiaCO: '',
        parroquiarendered: 1,
        predet: true
    }
    componentDidMount = () => {
        this.setState(() => ({
            predet: this.props.predet
        }))
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }
        axios.get('http://localhost:3000/getAllEstados', config)
            .then((res) => {
                res.data.forEach(element => {
                    let estadosInfo = {
                        clave: '',
                        nombre: ''
                    }
                    estadosInfo.clave = element.clave;
                    estadosInfo.nombre = element.estado;
                    this.setState((prevState) => ({
                        estados: prevState.estados.concat(estadosInfo)
                    }));
                })
                if(this.state.predet === false){
                    $('.dd-e').trigger('click')
                }
            }).catch((e) => {
                console.log('Error en axios')
            })
        if(this.state.predet === true){
            axios.get(`http://localhost:3000/getLugarByIdParroquia/${this.props.idParroquia}`, config)
                .then((res) => {
                    this.setState(() => ({
                    municipioSel: res.data[0].cmunicipio,
                    municipioCO: res.data[0].municipio,
                    estadoSel: res.data[0].cestado,
                    estadoCO: res.data[0].estado,
                    parroquiaCO: res.data[0].parroquia,
                    parroquiaSel: this.props.idParroquia
                }))
                    $('.dd-e').trigger('click')
                    console.log("WEPA", this.state)
                }).catch((e) => {
                    console.log('Error en axios')
                })
        }
    }

    renderOptions = (tipo, indexF) => {
        if (tipo === 'estado'){
            let estado = [];
            return (this.state.estados.map((optionPre, index) => {
                let existe = 0;
                //TODOS console.log("this.state.presentaciones",this.state.presentaciones)
                estado.forEach(element => {
                    //console.log(element, index)
                    if (optionPre.nombre === element){
                        existe = 1;
                    }
                })
                if (existe === 0){
                    estado.push(optionPre.nombre);
                    return(<option value={optionPre.clave} id={optionPre.nombre}>{optionPre.nombre}</option>)
                }
            }));
        }
        else if (tipo === 'municipio'){
            if (this.state.municipios.length > 0){
                return (this.state.municipios.map((optionMun) => {
                    return(<option value={optionMun.clave}>{optionMun.nombre}</option>)
                }));
            }
        }
        else if (tipo === 'parroquia'){
            if (this.state.parroquias.length > 0){
                return (this.state.parroquias.map((optionPar) => {
                    return(<option value={optionPar.clave} id={optionPar.clave}>{optionPar.nombre}</option>)
                }));
            }
        }
    }

    renderLugar = (tipo, index) => {
        if(this.props.accion === 'M'){
            if(tipo === 'estado'){
                return(
                    <Form.Control 
                        as="select" 
                        className="form-input dd-e"
                        onClick={this.renderMunicipios}
                    >
                    {
                        this.renderOptions('estado')
                    }
                    </Form.Control>
                )
            }
            if(tipo === 'municipio'){
                return(
                    <Form.Control 
                        as="select" 
                        className="form-input dd-m"
                        onClick={this.renderParroquias}
                    >
                        {
                            this.renderOptions('municipio')
                        }
                    </Form.Control>
                )
            }
            if(tipo === 'parroquia'){
                return(
                    <Form.Control 
                        as="select"
                        className="form-input dd-p"
                    >
                        {
                            this.renderOptions('parroquia')
                        }
                    </Form.Control>
                )
            }
        }else if(this.props.accion === 'CO'){
            if(tipo === 'estado'){
                return(<Form.Control type="text" className="form-input" value={this.state.estadoCO} disabled={true} autoFocus/>)
            }
            if(tipo === 'municipio'){
                return(<Form.Control type="text" className="form-input" value={this.state.municipioCO} disabled={true} autoFocus/>)
            }
            if(tipo === 'parroquia'){
                return(<Form.Control type="text" className="form-input" value={this.state.parroquiaCO} disabled={true} autoFocus/>)
            }
        }
    }

    renderMunicipios = (i) => {
        this.state.municipios = []
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }
        if(this.state.predet === false){
            axios.get(`http://localhost:3000/getAllMunicipiosByIdEstado/${i.target.value}`, config)
                .then((res) => {
                    res.data.forEach(element => {
                        let municipiosInfo = {
                            clave: '',
                            nombre: ''
                        }
                        municipiosInfo.clave = element.clave;
                        municipiosInfo.nombre = element.municipio;
                        this.setState((prevState) => ({
                            municipios: prevState.municipios.concat(municipiosInfo)
                        }));
                    })
                    $('.dd-m').trigger('click')
                }).catch((e) => {
                    console.log('Error en axios')
                })
        }
        if(this.state.predet === true){
            this.state.municipios = []
            axios.get(`http://localhost:3000/getAllMunicipiosByIdEstado/${this.state.estadoSel}`, config)
                .then((res) => {
                    res.data.forEach(element => {
                        let municipiosInfo = {
                            clave: '',
                            nombre: ''
                        }
                        municipiosInfo.clave = element.clave;
                        municipiosInfo.nombre = element.municipio;
                        this.setState((prevState) => ({
                            municipios: prevState.municipios.concat(municipiosInfo)
                        }));
                    })
                    $('.dd-m').trigger('click')
                    //console.log(this.state.municipios)
                }).catch((e) => {
                    console.log('Error en axios')
                })
        }
    }

    renderParroquias = (i) => {
        this.state.parroquias = []
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }
        if(this.state.predet === false){
        axios.get(`http://localhost:3000/getAllParroquiasByIdMunicipio/${i.target.value}`, config)
            .then((res) => {
                res.data.forEach(element => {
                    let parroquiasInfo = {
                        clave: '',
                        nombre: ''
                    }
                    parroquiasInfo.clave = element.clave;
                    parroquiasInfo.nombre = element.parroquia;
                    this.setState((prevState) => ({
                        parroquias: prevState.parroquias.concat(parroquiasInfo)
                    }));
                })
                //console.log(this.state.municipios)
            }).catch((e) => {
                console.log('Error en axios')
            })
        }
        if(this.state.predet === true){
            axios.get(`http://localhost:3000/getAllParroquiasByIdMunicipio/${this.state.municipioSel}`, config)
                .then((res) => {
                    res.data.forEach(element => {
                        let parroquiasInfo = {
                        clave: '',
                        nombre: ''
                    }
                    parroquiasInfo.clave = element.clave;
                    parroquiasInfo.nombre = element.parroquia;
                    this.setState((prevState) => ({
                        parroquias: prevState.parroquias.concat(parroquiasInfo)
                    }));
                })
            }).catch((e) => {
                    console.log('Error en axios')
            })
        }
    }

    renderPred = (tipo) => {
        if((tipo === 'estado')&&(this.state.predet === true)){
            $(".dd-e").val(this.state.estadoSel).change()
        }
        if((tipo === 'municipio')&&(this.state.predet === true)){
            $(".dd-m").val(this.state.municipioSel).change()
        }
        if((tipo === 'parroquia')&&(this.state.predet === true)){
            function test(t,valx,element){
                setTimeout(function(){
                    if(element.state.parroquiarendered === 1){
                        if((t === true)){
                            $(".dd-p option[value="+valx+"]").attr("selected",true);
                            //$('.dd-e').trigger('click');
                            //$(".dd-e").val(valx).change()
                        element.setState(() => ({
                            estadorendered: 0,
                            predet: false
                        }));
                        }
                    }
                    else if(element.state.parroquiarendered === 0){
                        console.log("no")
                    }
                },300);
            }
            test(this.state.predet,this.state.parroquiaSel,this);
            $(".dd-p").val(this.state.parroquiaSel).change()
            /*console.log($(".dd-p")[0][3])
            $(".dd-p").val(this.state.parroquiaSel).change()*/
            //this.forceUpdate()
        }
    }

    render(){
        return ( 
            <div>
                <Form.Row className="formMargins">
                    <Form.Group  as={Col} md="4" controlId="LugarEstado" className="div-ventas-pedido-form inputsPaddingRight">
                        <Form.Label className="cliente-description-fields-text">Estado</Form.Label>
                        {
                            this.renderLugar('estado')
                        }
                        {
                            this.renderPred('estado')
                        }
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="LugarMunicipio" className="div-ventas-pedido-form inputsPaddingRight">
                        <Form.Label className="cliente-description-fields-text">Municipio</Form.Label>
                        {
                            this.renderLugar('municipio')
                        }
                        {
                            this.renderPred('municipio')
                        }
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="LugarParroquia" className="div-ventas-pedido-form inputsPaddingLeft">
                        <Form.Label className="cliente-description-fields-text">Parroquia</Form.Label>
                        {
                            this.renderLugar('parroquia')
                        }
                        {
                            this.renderPred('parroquia')
                        }
                    </Form.Group>
                </Form.Row>
            </div>
        ) 
    }
}