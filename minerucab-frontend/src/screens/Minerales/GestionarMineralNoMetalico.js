import React from 'react';
import Button from 'react-bootstrap/Button';
// https://react-bootstrap.github.io/components/buttons/
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import {history} from '../../routers/History';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import axios from 'axios';
import $ from 'jquery'

export default class GestionarMineralNoMetalico extends React.Component {  
	state = {
        nombre: '',
        uso: '',
        descripcion: '',
        porcentaje: '',
        precio: '',
        presentaciones: [],
        presentacionesmin: [],
        componentes: [],
        componentesmin: [],
        modificar: true
    }
    componentDidMount = () => {
    	const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }

        if(this.props.match.params.accion === 'CO'){
            this.setState(() => ({
                modificar: false,
            }))
        }
        //Crear o Modificar (necesito valores predeterminados)
        if(this.props.match.params.accion !== 'CO'){
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
                
            axios.get('http://localhost:3000/getAllMineralesNoMetalicos', config)
                .then((res) => {
                    res.data.forEach(element => {
                        let componenteInfo = {
                            nombre: ''
                        }
                        componenteInfo.nombre = element.nombre;
                        this.setState((prevState) => ({
                            componentes: prevState.componentes.concat(componenteInfo)
                        }));
                    })
                }).catch((e) => {
                    console.log('Error en axios')
                })
        }

        //Consultar o modificar (necesito informacion)
        if (this.props.match.params.accion !== 'CR'){
            axios.get(`http://localhost:3000/getMineralNoMetalicoById/${this.props.match.params.id}`, config)
                .then((res) => {
                    console.log(res)
                  this.setState(() => ({
                    nombre: res.data[0].nombre,
                    uso: res.data[0].uso,
                    descripcion: res.data[0].descripcion,
                  }));
                axios.get(`http://localhost:3000/getAllPresentacionesByIdMineralNoMetalico/${this.props.match.params.id}`, config)
                    .then((res) => {
                        console.log("presentaciones", res)
                        res.data.forEach(element => {
                            let presInfo = {
                                presentacion: 1,
                                nombre: '',
                                precio: 0,
                                presShow: true,
                                numero: 1,
                                numeroV:1,
                            }
                            presInfo.clave = element.clave;
                            presInfo.nombre = element.nombre;
                            presInfo.precio = element.precio;
                            this.setState((prevState) => ({
                                presentacionesmin: prevState.presentacionesmin.concat(presInfo)
                            }));
                        })
                  }).catch((e) => {
                      console.log('Error en axios')
                  })
                axios.get(`http://localhost:3000/getAllComponentesByIdMineralNoMetalico/${this.props.match.params.id}`, config)
                    .then((res) => {
                        console.log("componentes", res)
                        res.data.forEach(element => {
                            let compInfo = {
                                mineral: 1,
                                nombre: '',
                                porcentaje: 1,
                                compShow: true,
                                numero: 1,
                                numeroV:1,
                            }
                            compInfo.mineral = element.clave;
                            compInfo.nombre = element.nombre;
                            compInfo.porcentaje = element.porcentaje;
                            this.setState((prevState) => ({
                                componentesmin: prevState.componentesmin.concat(compInfo)
                            }));
                        })
                    }).catch((e) => {
                         console.log('Error en axios')
                    })
              }).catch((e) => {
                  console.log('Error en axios')
              })
            
        }
    }
    onChangeText = (e) => {
        const text = e.target.value;
        
        if (!text || text.match(/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/)) {
            if (e.target.id === 'nombre-mineral-no-metalico'){
                this.setState({ nombre: e.target.value.trim() });
            }
            if (e.target.id === 'descripcion-mineral-no-metalico'){
                this.setState({ descripcion: e.target.value.trim() });
            }
        }
    }
    onChangeNumber = (e) => {
        const number = e.target.value;

        if ((!number) || number.match(/^[0-9\b]+$/)){
            console.log('number', number)
            if (e.target.id === 'uso-mineral-no-metalico'){
                this.setState({ uso: e.target.value });
            }
            else if (e.target.id === 'porcentaje-mineral-no-metalico'){
                this.setState({ porcentaje: e.target.value });
            }
            else if (e.target.id === 'precio-mineral-no-metalico'){
                this.setState({ precio: e.target.value });
            }
        }
    }
    addPresentacionesMin = (e) => {
        var presentacAux = this.state.presentacionesmin;
        var nuevaPresentacion = {
            presentacion: 1,
            precio: 1,
            presShow: true,
            numero: 1,
            numeroV:1,
        };
        for (var i = presentacAux.length - 1; i >= 0; i--) {
            if(presentacAux[i].numero!=0){
                nuevaPresentacion.numero=presentacAux[i].numero+1;
                break;
            }
        }
        nuevaPresentacion.numeroV=presentacAux[presentacAux.length-1].numeroV+1;

        this.setState((prevState) => ({
            presentacionesmin: prevState.presentacionesmin.concat(nuevaPresentacion),
        }));
    }
    addComponentesMin = (e) => {
        var componenteAux = this.state.componentesmin;
        var nuevoComponente = {
            mineral: 1,
            porcentaje: 1,
            compShow:true,
            numero: 1,
            numeroV:1,
        };
        for (var i = componenteAux.length - 1; i >= 0; i--) {
            if(componenteAux[i].numero!=0){
                nuevoComponente.numero=componenteAux[i].numero+1;
                break;
            }
        }
        nuevoComponente.numeroV=componenteAux[componenteAux.length-1].numeroV+1;

        this.setState((prevState) => ({
            componentesmin: prevState.componentesmin.concat(nuevoComponente),
        }));
        //const seleccionados = document.getElementsByClassName('form-input-dropdown-mineral-presentacion')[0].value
        //console.log(seleccionados)
    }
    deleteComponentesMin = (ind) => {
        var componentesMinAux = this.state.componentesmin;
        componentesMinAux[ind].compShow=false;
        componentesMinAux[ind].numero=0;

        for(var i = ind; i < componentesMinAux.length; i++) {
            if(componentesMinAux[i].numero!=0){
                componentesMinAux[i].numero--;
            }
        }

        this.setState(() => ({
            componentesmin: componentesMinAux,
        }));

        $('#form'+ind).remove();

        console.log(this.state.componentesmin)
        /*this.state.componentesmin.splice(ind,1);
        console.log(this.state.componentesmin)*/
    }
    deletePresentacionesMin = (ind) => {
        var presentacionesMinAux = this.state.presentacionesmin;
        presentacionesMinAux[ind].presShow=false;
        presentacionesMinAux[ind].numero=0;

        for(var i = ind; i < presentacionesMinAux.length; i++) {
            if(presentacionesMinAux[i].numero!=0){
                presentacionesMinAux[i].numero--;
            }
        }

        this.setState(() => ({
            presentacionesmin: presentacionesMinAux,
        }));

        $('#formpres'+ind).remove();

        console.log(this.state.presentacionesmin)
        /*this.state.componentesmin.splice(ind,1);
        console.log(this.state.componentesmin)*/
    }
    renderOptions = (tipo, indexF) => {
        if(tipo === 'presentacion'){
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
        if(tipo === 'componente'){
            let componente = [];
            return (this.state.componentes.map((optionPre, index) => {
                let existe = 0;
                componente.forEach(element => {
                    if (optionPre.nombre === element){
                        existe = 1;
                    }
                })
                if (existe === 0){
                    componente.push(optionPre.nombre);
                    return(<option value={optionPre.nombre} id={optionPre.nombre}>{optionPre.nombre}</option>)
                }
            }));
        }
    }
    renderPresentacionesMin = () => {
        if(this.props.match.params.accion === 'CO'){
            return this.state.presentacionesmin.map((option, index) => {
                const nombrePresentacion = option.nombre
                const precio = option.precio
                return (
                    <Form.Row className="div-min-met-presentaciones-form" key={index} id={'formpres'+index}>
                        <Col md={12}>
                            <Row>
                                <Col md={5}>
                                    <Form.Label className="cliente-description-fields-text">Presentación</Form.Label>
                                    <Form.Control 
                                        key={index} 
                                        id={''+index}
                                        className="form-input form-input-dropdown-mineral-met-presentacion"
                                        value={option.nombre}
                                        disabled={true}
                                    />
                                </Col>
                                <Col md={5}>
                                    <Form.Label className="cliente-description-fields-text">Precio</Form.Label>
                                        <Form.Group>
                                            <InputGroup className="MyInputGroup">
                                                <Form.Control
                                                    className="form-input form-input-text-precio" 
                                                    key={index} 
                                                    id={''+index}
                                                    value={option.precio}
                                                    disabled={true}
                                                />
                                                <InputGroup.Append>
                                                    <InputGroup.Text className="input-append-ventas-form" key={index}>$</InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>
                                </Col>
                                <Col md={1}></Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                    </Form.Row>
                )
            })
        }else{
        	return this.state.presentacionesmin.map((option, index) => {
        		return (
        			<Form.Row className="div-min-met-presentaciones-form" key={index} id={'formpres'+index}>
        				<Col md={12}>
        					<Row>
    		    				<Col md={5}>
    			    				<Form.Label className="cliente-description-fields-text">Presentación</Form.Label>
    			                    <Form.Control 
    			                        as="select" 
    			                        key={index} 
    			                        id={''+index}
    			                        className="form-input form-input-dropdown-mineral-no-met-presentacion"
                                        onChange={this.selectedOption}>
    			                        {
    			                            this.renderOptions('presentacion')
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
    		    				<Col md={1}>
                                    <Form.Label className="cliente-description-fields-text"></Form.Label>
                                    <Button 
                                        variant="outline-danger"
                                        className="btn-block"
                                        onClick={() => this.deletePresentacionesMin(index)}
                                    >
                                        x
                                    </Button>
                                </Col>
                                <Col md={1}></Col>
    		    			</Row>
        				</Col>
        			</Form.Row>
        		)
        	})
        }
    }
    renderComponentesMin = () => {
        if(this.props.match.params.accion === 'CO'){
            return this.state.componentesmin.map((option, index) => {
                return (
                    <Form.Row className="div-min-met-componentes-form" key={index} id={'form'+index}>
                        <Col md={12}>
                            <Row>
                                <Col md={5}>
                                    <Form.Label className="cliente-description-fields-text">Mineral</Form.Label>
                                    <Form.Control 
                                        key={index} 
                                        id={''+index}
                                        className="form-input form-input-dropdown-min-no-met-componente"
                                        value={option.nombre}
                                        disabled={true}
                                    />
                                </Col>
                                <Col md={5}>
                                    <Form.Label className="cliente-description-fields-text">Porcentaje</Form.Label>
                                        <Form.Group>
                                            <InputGroup className="MyInputGroup InputGroupPorcentajeCompone">
                                                <Form.Control 
                                                    className="form-input" 
                                                    id='porcentaje-compone-min-no-met'
                                                    value={option.porcentaje}
                                                    disabled={true}
                                                />
                                                <InputGroup.Append>
                                                    <InputGroup.Text className="input-append-ventas-form">%</InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>
                                </Col>
                                <Col md={1}></Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                    </Form.Row>
                )
            })
        }else{
            return this.state.componentesmin.map((option, index) => {
                return (
                    <Form.Row className="div-min-met-componentes-form" key={index} id={'form'+index}>
                        <Col md={12}>
                            <Row>
                                <Col md={5}>
                                    <Form.Label className="cliente-description-fields-text">Mineral</Form.Label>
                                    <Form.Control 
                                        as="select" 
                                        key={index} 
                                        id={''+index}
                                        defaultValue={this.componente}
                                        className="form-input form-input-dropdown-min-no-met-componente"
                                        onChange={this.selectedOption}>
                                        {
                                            this.renderOptions('componente')
                                        }
                                    </Form.Control>
                                </Col>
                                <Col md={5}>
                                    <Form.Label className="cliente-description-fields-text">Porcentaje</Form.Label>
                                        <Form.Group>
                                            <InputGroup className="MyInputGroup InputGroupPorcentajeCompone">
                                                <Form.Control 
                                                    type="number" 
                                                    className="form-input" 
                                                    id='porcentaje-compone-min-no-met'
                                                    defaultValue={1}
                                                    step="0.01"
                                                    min="0"
                                                    max="100"
                                                />
                                                <InputGroup.Append>
                                                    <InputGroup.Text className="input-append-ventas-form">%</InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Text className="text-muted">
                                            Este campo es obligatorio
                                        </Form.Text>
                                </Col>
                                <Col md={1}>
                                    <Form.Label className="cliente-description-fields-text"></Form.Label>
                                    <Button 
                                        variant="outline-danger"
                                        className="btn-block"
                                        onClick={() => this.deleteComponentesMin(index)}
                                    >
                                        x
                                    </Button>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                    </Form.Row>
                )
            })
        }
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
                                    <h5 className="horizontal-line-title cliente-title">Registrar Mineral No Metalico</h5>
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
                                                id="nombre-mineral-no-metalico"
                                                value={this.state.nombre} 
                                                placeholder="Introduzca el nombre del mineral"
                                                autoFocus
                                                onChange={this.onChangeText} 
                                                disabled={!this.state.modificar}
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
                                            <Form.Label className="cliente-description-fields-text">Uso</Form.Label>
	                                            <Form.Control 
	                                                type="text" 
                                                    as="textarea"
                                                    rows="2"
	                                                className="form-input" 
	                                                id='uso-mineral-no-metalico'
	                                                placeholder="Introduzca el uso del mineral"
	                                                value={this.state.uso}
	                                                onChange={this.onChangeText}
                                                    disabled={!this.state.modificar}
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
                                                as="textarea"
                                                rows="2" 
                                                id="descripcion-mineral-no-metalico"
                                                className="form-input" 
                                                value={this.state.descripcion} 
                                                placeholder="Introduzca la descripción" 
                                                onChange={this.onChangeText} 
                                                disabled={!this.state.modificar}
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
                                        {
                                            (this.props.match.params.accion !== 'CO') &&
                                            <Button 
                                                className="ventas-form-btn btn-block"
                                                onClick={this.addPresentacionesMin}
                                            >
                                                Agregar
                                            </Button>
                                        }
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
                    <div>
                        <Row className="div-content-form">
                            <Col md={2}></Col>
                            <Col md={9}>
                            {
                                this.renderComponentesMin()
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
                    <div className="div-content-form">
                        <Row className="div-content-form-end-rc">
                            <Col md={2}></Col>
                            <Col md={10}>
                                <Row>
                                    <Col md={7}></Col>
                                    <Col md={5}>
                                        {
                                            (this.props.match.params.accion !== 'CO') &&
                                            <Button 
                                                className="ventas-form-btn btn-block"
                                                onClick={this.addComponentesMin}
                                            >
                                                Agregar
                                            </Button>
                                        }
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={1}></Col>
                        </Row>
                    </div>
                    <div className="div-content-form">
                        <Row className="div-content-form-end-rc">
                            <Col md={2}></Col>
                            <Col md={9}>
                                <Row>
                                    <Col md={5}>
                                    </Col>
                                    <Col md={2}></Col>
                                    <Col md={5}>
                                        {
                                            (this.props.match.params.accion !== 'CO') &&
                                            <Button 
                                                className="ccargo-btn btn-block"
                                                onClick={this.onSubmit}
                                            >
                                                Registrar
                                            </Button>
                                        }
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