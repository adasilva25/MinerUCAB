import React from 'react';
import Button from 'react-bootstrap/Button';
// https://react-bootstrap.github.io/components/buttons/
import ReactDOMServer from 'react-dom/server';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import {history} from '../../routers/History';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import axios from 'axios';

export default class RegistrarMineralMetalico extends React.Component {  
	state = {
        nombre: '',
        dureza: '',
        descripcion: '',
        porcentaje: '',
        precio: '',
        presentaciones: [],
        presentacionesmin: [{
            presentacion: "Crudo",
            precio: 0.00
        }],
        presentacionesSelec: [],
    }
    componentDidMount = () => {
    	const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }
        axios.get('http://localhost:3000/getAllPresentaciones', config)
            .then((res) => {
                res.data.forEach(element => {
                    let presentacionInfo = {
                        nombre: ''
                    }
                    presentacionInfo.nombre = element.nombre;
                    this.setState((prevState) => ({
                        presentaciones: prevState.presentaciones.concat(presentacionInfo)
                    }));
                })
            }).catch((e) => {
                console.log('Error en axios')
            })
            
        /*LUEGO DEBO HACER GET MINERALES
        axios.get(`http://localhost:3000/getEmpleadoById/${this.props.match.params.id}`, config)
            .then((res) => {
                console.log(res)
                this.setState(() => ({
                    nombre: res.data[0].nombre + ' ' + res.data[0].apellido,
                    ci: res.data[0].ci
                }));
            }).catch((e) => {
                console.log('Error en axios')
            })*/
        /*if (this.props.match.params.accion !== 'CR'){
            const config = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                responseType: 'json'
            }
            
            axios.get(`http://localhost:3000/getMineralMetalicoById/${this.props.match.params.id}`, config)
                .then((res) => {
                    console.log(res);
                    this.setState({ nombre: res.data[0].nombre });
                    this.setState({ descripcion: res.data[0].descripcion });
                    this.setState({ dureza: res.data[0].dureza });
                }).catch((e) => {
                    console.log('Error en axios')
                })
        }*/
    }
    onChangeText = (e) => {
        const text = e.target.value;
        
        if (!text || text.match(/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/)) {
            if (e.target.id === 'nombre-mineral-metalico'){
                this.setState({ nombre: e.target.value.trim() });
            }
            if (e.target.id === 'descripcion-mineral-metalico'){
                this.setState({ descripcion: e.target.value.trim() });
            }
        }
    }
    onChangeNumber = (e) => {
        const number = e.target.value;

        if ((!number) || number.match(/^[0-9\b]+$/)){
            console.log('number', number)
            if (e.target.id === 'dureza-mineral-metalico'){
                this.setState({ dureza: e.target.value });
            }
            else if (e.target.id === 'porcentaje-mineral-metalico'){
                this.setState({ porcentaje: e.target.value });
            }
            else if (e.target.id === 'precio-mineral-metalico'){
                this.setState({ precio: e.target.value });
            }
        }
    }
    addPresentacionesMin = (e) => {
        const nuevaPresentacion = {
            presentacion: "Crudo",
            precio: 0.00
        };

        this.setState((prevState) => ({
            presentacionesmin: prevState.presentacionesmin.concat(nuevaPresentacion),
        }));
        //const seleccionados = document.getElementsByClassName('form-input-dropdown-mineral-presentacion')[0].value
    	//console.log(seleccionados)
    }
    selectedOption = (e) => {  
    	console.log(e.target.value);
    	//this.setState.presentacionesSelec=
	}
    renderOptions = (indexF) => {
    	let presentacion = [];
    	return (this.state.presentaciones.map((optionPre, index) => {
    		let existe = 0;
    		//TODOS console.log("this.state.presentaciones",this.state.presentaciones)
    		presentacion.forEach(element => {
    			//console.log(element, index)
    			if (optionPre.nombre === element){
    				existe = 1;
    			}
    		})
    		if (existe === 0){
    			presentacion.push(optionPre.nombre);
    			return(<option value={optionPre.nombre} id={optionPre.nombre}>{optionPre.nombre}</option>)
    		}
    	}));
    }
    renderPresentacionesMin = () => {
    	return this.state.presentacionesmin.map((option, index) => {
    		return (
    			<Form.Row className="div-min-met-presentaciones-form" key={index} id={'form'+index}>
    				<Col md={12}>
    					<Row>
		    				<Col md={5}>
			    				<Form.Label className="cliente-description-fields-text" refs="premindropdown">Presentación</Form.Label>
			                    <Form.Control 
			                        as="select" 
			                        key={index} 
			                        id={''+index}
			                        className="form-input form-input-dropdown-mineral-venta form-input-dropdown-mineral-presentacion"
			                        onChange={this.selectedOption}>
			                        {
			                            this.renderOptions()
			                        }
			                    </Form.Control>
		    				</Col>
		    				<Col md={5}>
		    					<Form.Label className="cliente-description-fields-text">Precio</Form.Label>
			    					<Form.Group>
		                                <InputGroup className="MyInputGroup">
		                                    <Form.Control
		                                    	type="number"
		                                    	step="0.01"
		                                        className="form-input form-input-text-precio" 
		                                        key={index} 
		                                        defaultValue={1}
		                                        id={''+index}
		                                        min="0"
		                                    />
		                                    <InputGroup.Append>
		                                        <InputGroup.Text className="input-append-ventas-form" key={index}>$</InputGroup.Text>
		                                    </InputGroup.Append>
		                                </InputGroup>
		                            </Form.Group>
				                    <Form.Text className="text-muted">
				                        Este campo es obligatorio
				                    </Form.Text>
		                    </Col>
		    				<Col md={2}></Col>
		    			</Row>
    				</Col>
    			</Form.Row>
    			)
    	})
    }
    render(){
        return (
            <div className="contain pagecontent" id="Content">
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario='Andrea Da Silva'/>
                <Container>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={9}>
                            <Row>
                                <Col md={11}>
                                    <h5 className="horizontal-line-title cliente-title">Registrar Mineral Metalico</h5>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                        <Col md={1}></Col>
                    </Row>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={10}>
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Información del mineral</h6>
                                </Col>
                                <Col md={2}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <Row className="div-content-form">
                            <Col md={2}></Col>
                            <Col md={9}>
                                <Form.Row>
                                	<Col md={3}></Col>
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Nombre</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                className="form-input" 
                                                id="nombre-mineral-metalico"
                                                value={this.state.nombre} 
                                                placeholder="Introduzca el nombre del mineral"
                                                autoFocus
                                                onChange={this.onChangeText} 
                                            />
                                            <Form.Text className="text-muted">
                                                Este campo es obligatorio
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}></Col>
                                </Form.Row>
                            </Col>
                            <Col md={1}></Col>
                        </Row>
                    </div>
                    <div>
                        <Row className="div-content-form">
                            <Col md={2}></Col>
                            <Col md={9}>
                                <Form.Row>
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Porcentaje de dureza</Form.Label>
	                                            <Form.Control 
	                                                type="text" 
	                                                className="form-input" 
	                                                id='dureza-mineral-metalico'
	                                                placeholder="Introduzca el porcentaje de dureza del mineral"
	                                                value={this.state.dureza}
	                                                onChange={this.onChangeNumber}
	                                            />
	                                            <Form.Text className="text-muted">
	                                                Este campo es obligatorio
	                                            </Form.Text>
                                        </Form.Group>   
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Descripción</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                id="descripcion-mineral-metalico"
                                                className="form-input" 
                                                value={this.state.descripcion} 
                                                placeholder="Introduzca la descripción" 
                                                onChange={this.onChangeText} 
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                </Form.Row>
                            </Col>
                            <Col md={1}></Col>
                        </Row>
                    </div>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={10}>
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Presentaciones disponibles</h6>
                                </Col>
                                <Col md={2}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <Row className="div-content-form">
                            <Col md={2}></Col>
                            <Col md={9}>
                            {
                            	this.renderPresentacionesMin()
                            }
                            </Col>
                            <Col md={1}></Col>
                        </Row>
                    </div>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={9}>
                            <Row>
                                <Col md={11}>
                                    <h6 className="horizontal-line-ventas-form"></h6>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                        <Col md={1}></Col>
                    </Row>
                    <div>
                        <Row className="div-content-form div-content-form-end-rc">
                            <Col md={2}></Col>
                            <Col md={10}>
                                <Row>
                                    <Col md={7}></Col>
                                    <Col md={5}>
                                        <Button 
                                            className="ventas-form-btn btn-block"
                                            onClick={this.addPresentacionesMin}
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
                                <Col md={10}>
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Minerales que lo componen</h6>
                                </Col>
                                <Col md={2}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <div className="div-content-form">
                        <Row className="div-content-form-end-rc">
                            <Col md={2}></Col>
                            <Col md={9}>
                                <Row>
                                    <Col md={5}>
                                    </Col>
                                    <Col md={2}></Col>
                                    <Col md={5}>
                                        <Button 
                                            className="ccargo-btn btn-block"
                                            onClick={this.onSubmit}
                                        >
                                            Enviar
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={1}></Col>
                        </Row>
                    </div>
                </Container>
            </div>                 
        )
    }
}