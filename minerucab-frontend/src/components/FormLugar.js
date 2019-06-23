import React from 'react';
import axios from 'axios';
import FormTitulo from '../components/FormTitulo'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import $ from 'jquery'

export default class FormLugar extends React.Component {
    state = {
        estados: [],
        municipios: [],
        parroquias: [],
    }
    componentDidMount = () => {
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
                $('.dd-e').trigger('click')
            }).catch((e) => {
                console.log('Error en axios')
            })
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
            }else{
                return(<option value='vacio'></option>)
            }
        }
        else if (tipo === 'parroquia'){
            if (this.state.parroquias.length > 0){
                return (this.state.parroquias.map((optionPar) => {
                    return(<option value={optionPar.clave}>{optionPar.nombre}</option>)
                }));
            }else{
                return(<option value='vacio'></option>)
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

    renderParroquias = (i) => {
        this.state.parroquias = []
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }
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

    render(){
        return ( 
            <div>
                
                <Form.Row className="formMargins">
                    <Form.Group  as={Col} md="4" controlId="formBasicEmail" className="div-ventas-pedido-form inputsPaddingRight">
                        <Form.Label className="cliente-description-fields-text">Estado</Form.Label>
                        <Form.Control 
                            as="select" 
                            className="form-input dd-e"
                            onClick={this.renderMunicipios}
                        >
                        {
                            this.renderOptions('estado')
                        }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="formBasicEmail" className="div-ventas-pedido-form inputsPaddingRight">
                        <Form.Label className="cliente-description-fields-text">Municipio</Form.Label>
                        <Form.Control 
                            as="select" 
                            className="form-input dd-m"
                            onClick={this.renderParroquias}
                        >
                            {
                                this.renderOptions('municipio')
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="formBasicEmail" className="div-ventas-pedido-form inputsPaddingLeft">
                        <Form.Label className="cliente-description-fields-text">Parroquia</Form.Label>
                        <Form.Control 
                            as="select"
                            className="form-input dd-p"
                        >
                            {
                                this.renderOptions('parroquia')
                            }
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
            </div>
        ) 
    }
}