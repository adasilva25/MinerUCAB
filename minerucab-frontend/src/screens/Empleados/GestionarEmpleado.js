import React from 'react';
import Button from 'react-bootstrap/Button';
import ReactDOMServer from 'react-dom/server';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import Accordion from 'react-bootstrap/Accordion'
import FormTitulo from '../../components/FormTitulo'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import {history} from '../../routers/History';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import FormLugar from '../../components/FormLugar'
import FormLugarPred from '../../components/FormLugarPred'
import axios from 'axios';
import $ from 'jquery'

export default class GestionarEmpleado extends React.Component {  
	state = {
        poseeusuario: true,
		cargos: [],
		roles: [],
		accordionKey:[],
        modificar: true,
        pnombre: '',
        snombre: '',
        papellido: '',
        sapellido: '',
        nacionalidad: '',
        ci: '',
        sexo: '',
        nacimd: '',
        nacimm: '',
        nacima: '',
        nivel: '',
        telefono: '',
        pred: false,
        parroquia: '',
        cargo: [{
            clave: '',
            nombre: '',
        }],
        rol: [{
            clave: '',
            nombre: '',
        }],
        usuario: [{
            usuario: '',
            contrasena: '',
        }]
    }
    componentDidMount = () => {
    	const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }
        //Si creo o modifico
        if (this.props.match.params.accion !== 'CO'){
            axios.get('http://localhost:3000/getAllCargos', config)
                .then((res) => {
                    res.data.forEach(element => {
                        let cargoInfo = {
                            nombre: ''
                        }
                        cargoInfo.nombre = element.nombre;
                        this.setState((prevState) => ({
                            cargos: prevState.cargos.concat(cargoInfo)
                        }));

                    })
                }).catch((e) => {
                    console.log('Error en axios')
                })
            axios.get('http://localhost:3000/getAllRoles', config)
                .then((res) => {
                    res.data.forEach(element => {
                        let rolInfo = {
                            nombre: ''
                        }
                        rolInfo.nombre = element.nombre;
                        this.setState((prevState) => ({
                            roles: prevState.roles.concat(rolInfo)
                        }));
                    })
                }).catch((e) => {
                    console.log('Error en axios')
                })
        }
        //Si consulto o modifico
        if (this.props.match.params.accion !== 'CR'){
                axios.get(`http://localhost:3000/getEmpleadoById/${this.props.match.params.id}`, config)
                .then((res) => {
                    console.log(res)
                    var d = new Date(res.data[0].fecha_nacimiento,);
                  this.setState(() => ({
                    pnombre: res.data[0].p_nombre,
                    snombre: res.data[0].s_nombre,
                    papellido: res.data[0].p_apellido,
                    sapellido: res.data[0].s_apellido,
                    nacionalidad: res.data[0].ci[0],
                    ci: res.data[0].ci.slice(1),
                    sexo: res.data[0].sexo[0],
                    nacimd: d.getDate(),
                    nacimm: (d.getMonth()+1),
                    nacima: d.getFullYear(),
                    nivel: res.data[0].nivel_de_instruccion,
                    telefono: res.data[0].telefono,
                    parroquia: res.data[0].fk_lugar
                  }))
                  this.state.pred=true;
              }).catch((e) => {
                  console.log('Error en axios')
              })
              axios.get(`http://localhost:3000/getCargoByIdEmpleado/${this.props.match.params.id}`, config)
                .then((res) => {
                  this.setState(() => ({
                    cargo: [{
                        clave: res.data[0].clave,
                        nombre: res.data[0].nombre,
                    }]
                  }));
              }).catch((e) => {
                  console.log('Error en axios')
              })
              axios.get(`http://localhost:3000/getUsuarioById/${this.props.match.params.id}`, config)
                .then((res) => {
                    if(res.data.length === 0){
                        this.setState(() => ({
                            poseeusuario: false,
                        }))
                    }
                    else{
                        this.setState(() => ({
                            usuario: [{
                                clave: res.data[0].clave,
                                usuario: res.data[0].usuario,
                                contrasena: res.data[0].contrasena,
                            }]
                          }));
                    }
              }).catch((e) => {
                  console.log('Error en axios')
              })
              if(this.state.poseeusuario === false){
                axios.get(`http://localhost:3000/getRolByIdEmpleado/${this.props.match.params.id}`, config)
                .then((res) => {
                  this.setState(() => ({
                    rol: [{
                        clave: res.data[0].clave,
                        nombre: res.data[0].nombre,
                    }]
                  }));
              }).catch((e) => {
                  console.log('Error en axios')
              })
            }
        }

        //Si consulto
        if (this.props.match.params.accion === 'CO'){
            this.setState(() => ({
              modificar: false
            }));
        }
    }
    renderOptions = (tipo, indexF) => {
    	if(tipo === 'cargo'){
	    	let cargo = [];
	    	return (this.state.cargos.map((optionPre, index) => {
	    		let existe = 0;
	    		//TODOS console.log("this.state.presentaciones",this.state.presentaciones)
	    		cargo.forEach(element => {
	    			//console.log(element, index)
	    			if (optionPre.nombre === element){
	    				existe = 1;
	    			}
	    		})
	    		if (existe === 0){
	    			cargo.push(optionPre.nombre);
	    			return(<option value={optionPre.clave} id={optionPre.nombre}>{optionPre.nombre}</option>)
	    		}
	    	}));
	    }
	    if(tipo === 'rol'){
	    	let rol = [];
	    	return (this.state.roles.map((optionPre, index) => {
	    		let existe = 0;
	    		//TODOS console.log("this.state.presentaciones",this.state.presentaciones)
	    		rol.forEach(element => {
	    			//console.log(element, index)
	    			if (optionPre.nombre === element){
	    				existe = 1;
	    			}
	    		})
	    		if (existe === 0){
	    			rol.push(optionPre.nombre);
	    			return(<option value={optionPre.clave} id={optionPre.nombre}>{optionPre.nombre}</option>)
	    		}
	    	}));
	    }
    }
    renderType = (tipo, index) => {
        if(this.props.match.params.accion === 'CO'){
            if(tipo === 'cargo'){
                return(<Form.Control type="text" className="form-input" value={this.state.cargo[0].nombre} disabled={true} autoFocus/>)
            }else if(tipo === 'rol'){
                return(<Form.Control type="text" className="form-input" value={this.state.rol[0].nombre} disabled={true} autoFocus/>)
            }
        }else{
            if(tipo === 'cargo'){
                return(
                    <Form.Control 
                        as="select" 
                        className="form-input form-input-dropdown-cargo-empleado">
                        {
                            this.renderOptions('cargo')
                        }
                    </Form.Control>
                )
            }
            else if(tipo === 'rol'){
                return(
                    <Form.Control 
                        as="select" 
                        className="form-input form-input-dropdown-rol-empleado">
                        {
                            this.renderOptions('rol')
                        }
                    </Form.Control>
                )
            }
        }
    } 
    onInputChange = (e) => {
      const modif = e.target.value;
      this.setState(() => ({ modif }));
      console.log("em")
    }
    onSubmit = (e) => {
        console.log(document.getElementById('LugarEstado').value)
        console.log(document.getElementById('LugarMunicipio').value)
        console.log(document.getElementById('LugarParroquia').value)
        //console.log(this.state.pnombre, this.state.snombre, this.state.papellido, this.state.sapellido)
        //console.log(this.state.nacionalidad, this.state.ci, this.state.nacimd, this.state.nacimm, this.state.nacima)
        //console.log(this.state.sexo)
        //console.log(this.state.telefono, this.state.nivel)
        //console.log(this.state.cargo[0].nombre, this.state.rol[0].nombre)
        //console.log(this.state.usuario[0].usuario, this.state.usuario[0].contrasena)
    }
    renderTitle = () => {
      if (this.props.match.params.accion === 'CR'){
        return <h5 className="horizontal-line-title ccargo-title">Registrar empleado</h5>
      }
      if (this.props.match.params.accion === 'CO'){
        return <h5 className="horizontal-line-title ccargo-title">Consultar empleado</h5>
      }
      if (this.props.match.params.accion === 'M'){
        return <h5 className="horizontal-line-title ccargo-title">Modificar empleado</h5>
      }
    }
    renderLugar = () => {
        if(this.state.pred){
            return (<FormLugarPred idParroquia={this.state.parroquia} predet={this.state.pred} accion={this.props.match.params.accion}/>)
        }
        else{
            return (<FormLugar />) //predet={false}
        }
    }
    renderPred = (tipo) => {
        if((tipo === 'cargo')){
            $(".form-input-dropdown-cargo-empleado").val(this.state.cargo[0].nombre).change()
        }
        if((tipo === 'rol')){
            $(".form-input-dropdown-rol-empleado").val(this.state.rol[0].nombre).change()
        }
    }
    accordionf(e){
        var k=this.state.accordionKey;
        if (k[e] === undefined){
            if(e != 0){
                for(var i=0; i<=(e-k.length);i++){
                    k.push(0);
                }
            }
            else{
                k.push(0);
                
            }
        }
            if(k[e] === 0){
                k[e]=1;
                this.setState((prevState) => ({
                    accordionKey: k
                }));
            }
            else{
                k[e]=0;
                this.setState((prevState) => ({
                    accordionKey: k
                }));
            }
    }
    render(){
        return (
            <div className="contain pagecontent" id="Content">
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario='Alba Sánchez'/>
                <Container>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={9}>
                            <Row>
                                <Col md={11}>
                                    {
                                        this.renderTitle()
                                    }
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
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Información general</h6>
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
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Primer nombre</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                className="form-input" 
                                                id="p-nombre-empleado"
                                                value={this.state.pnombre}
                                                disabled={!this.state.modificar}
                                                onChange={this.onInputChange}
                                                placeholder="Introduzca el primer nombre"
                                                autoFocus
                                            />
                                            <Form.Text className="text-muted">
                                                Este campo es obligatorio
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Segundo nombre</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                className="form-input" 
                                                id="s-nombre-empleado"
                                                value={this.state.snombre}
                                                disabled={!this.state.modificar}
                                                onChange={this.onInputChange}
                                                placeholder="Introduzca el segundo nombre"
                                                autoFocus
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
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
                                            <Form.Label className="cliente-description-fields-text">Primer apellido</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                className="form-input" 
                                                id="p-apellido-empleado"
                                                value={this.state.papellido}
                                                disabled={!this.state.modificar}
                                                onChange={this.onInputChange}
                                                placeholder="Introduzca el primer apellido"
                                                autoFocus
                                            />
                                            <Form.Text className="text-muted">
                                                Este campo es obligatorio
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Segundo apellido</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                className="form-input" 
                                                id="s-apellido-empleado"
                                                value={this.state.sapellido}
                                                disabled={!this.state.modificar}
                                                onChange={this.onInputChange}
                                                placeholder="Introduzca el segundo apellido"
                                                autoFocus
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
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
                                            <Form.Label className="cliente-description-fields-text">Cédula de Identidad</Form.Label>
                                            <Row className="div-content-date">
                                                <Form.Control
                                                as="select"
                                                className="form-input form-ci-type"
                                                disabled={!this.state.modificar}
                                                value={this.state.nacionalidad}>
                                                    <option>V</option>
                                                    <option>E</option>
                                                </Form.Control>   
                                                <Form.Control 
                                                    type="text" 
                                                    className="form-input form-ci-number" 
                                                    id='ci-empleado'
                                                    value={this.state.ci}
                                                    disabled={!this.state.modificar}
                                                    onChange={this.onInputChange}
                                                    placeholder="Introduzca su cédula de identidad"
                                                    value={this.state.ci}
                                                />                                       
                                            </Row>  
                                            <Form.Text className="text-muted">
                                                Este campo es obligatorio
                                            </Form.Text> 
                                        </Form.Group>   
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Fecha de Nacimiento</Form.Label>
                                                <Row className="div-content-date">
                                                    <Form.Control 
                                                        type="text" 
                                                        id="dia-empleado"
                                                        className="form-date form-input form-input-day" 
                                                        placeholder="DD"
                                                        value={this.state.nacimd}
                                                        disabled={!this.state.modificar}
                                                        onChange={this.onInputChange}
                                                    />                                                    
                                                        <Form.Text className="text-muted">
                                                            _
                                                        </Form.Text>
                                                    <Form.Control 
                                                        type="text" 
                                                        className="form-date form-input" 
                                                        placeholder="MM" 
                                                        id="mes-empleado"
                                                        value={this.state.nacimm}
                                                        disabled={!this.state.modificar}
                                                        onChange={this.onInputChange}
                                                    />                                                    
                                                        <Form.Text className="text-muted">
                                                            _
                                                        </Form.Text>
                                                    <Form.Control 
                                                        type="text" 
                                                        id="ano-empleado"
                                                        className="form-date form-input"
                                                        placeholder="YYYY" 
                                                        value={this.state.nacima}
                                                        disabled={!this.state.modificar}
                                                        onChange={this.onInputChange}
                                                    />                                            
                                                </Row>
                                                <Form.Text className="text-muted">
                                                    Este campo es obligatorio
                                                </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
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
                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Sexo</Form.Label>
	                                            <Form.Control as="select"
                                                className="form-input form-sex-type"
                                                disabled={!this.state.modificar}
                                                value={this.state.sexo}>
                                                    <option>M</option>
                                                    <option>F</option>
                                                    <option>O</option>
                                                </Form.Control>
                                        </Form.Group>   
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={7}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Teléfono</Form.Label>
                                            <Form.Control 
                                                id="telefono-empleado"
                                                className="form-input" 
                                                value={this.state.telefono}
                                                disabled={!this.state.modificar}
                                                onChange={this.onInputChange}
                                                placeholder="Introduzca el teléfono"
                                            />
                                            <Form.Text className="text-muted">
                                                Este campo es obligatorio
                                            </Form.Text>
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
                        <Col md={9}>
                            <Row>
                                <Col md={11}>
                                {
                                    (!this.state.pred) && this.renderLugar()
                                }
                                {
                                    (this.state.pred) && this.renderLugar()
                                }
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                        <Col md={1}></Col>
                    </Row>
                    <div>
                        <Row className="div-content-form">
                            <Col md={2}></Col>
                            <Col md={9}>
                                <Form.Row>
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Nivel de instrucción</Form.Label>
                                            <Form.Control as="select"
                                            className="form-input form-nivel"
                                            disabled={!this.state.modificar}
                                            value={this.state.nivel}>
                                                <option>Primaria</option>
                                                <option>Secundaria</option>
                                                <option>Universitaria</option>
                                                <option>Superior</option>
                                                <option>Otro</option>
                                            </Form.Control>
                                            <Form.Text className="text-muted">
                                                Este campo es obligatorio
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Label className="cliente-description-fields-text">Cargo</Form.Label>
					                    {
                                            this.renderType('cargo')
                                        }
                                        {
                                            this.renderPred('cargo')
                                        }
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
			             	<Row className="div-content-form">
				            	<Col md={10}>
			                    <Accordion defaultActiveKey={1} >
				            		<Card className="CardAcc">
					                    <Accordion.Toggle as={Card.Header} eventKey={this.state.accordionKey[0]} onClick={() => this.accordionf(0)} className="accordion borderacc">
				                            <h6 className="horizontal-line-title-ventas-form cliente-title formTitulo">Usuario (Opcional)</h6>
					               		</Accordion.Toggle>
					               		<Accordion.Collapse eventKey={0} >
					                            <Card.Body className="BodyAcc">
					                                <Form.Row>
					                                	<Col md={3}>
					                                	<Form.Label className="cliente-description-fields-text">Rol</Form.Label>
										                    {
                                                                this.renderType('rol')
                                                            }
                                                            {
                                                                this.renderPred('rol')
                                                            }
					                                	</Col>
					                                	<Col md={1}></Col>
					                                	<Col md={8}>
						                                	<Row>
							                                    <Col md={5}>
							                                        <Form.Group>
							                                            <Form.Label className="cliente-description-fields-text">Usuario</Form.Label>
							                                            <Form.Control 
							                                                type="text" 
							                                                className="form-input" 
							                                                id="usuario-usuario"
							                                                value={this.state.usuario[0].usuario}
                                                                            disabled={!this.state.modificar}
                                                                            onChange={this.onInputChange} 
							                                                placeholder="Usuario"
							                                                autoFocus
							                                            />
							                                        </Form.Group>
							                                    </Col>
							                                    <Col md={1}></Col>
							                                    <Col md={5}>
							                                        <Form.Group>
							                                            <Form.Label className="cliente-description-fields-text">Contraseña</Form.Label>
							                                            <Form.Control 
							                                                type="password"
							                                                className="form-input" 
							                                                id="contrasena-empleado"
							                                                value={this.state.usuario[0].contrasena}
                                                                            disabled={!this.state.modificar}
                                                                            onChange={this.onInputChange}
							                                                placeholder="Contraseña"
							                                                autoFocus
							                                            />
							                                        </Form.Group>
							                                    </Col>
							                                    <Col md={1}></Col>
						                                    </Row>
						                                </Col>
					                                </Form.Row>
					                            </Card.Body>
					                    </Accordion.Collapse>
				                    </Card>
			                    </Accordion>
			                    </Col>
			                    <Col md={2}></Col>
			                </Row>
		                </Col>
		            </Row>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={10}>
                                    <h6 className="horizontal-line-title-ventas-form cliente-title"></h6>
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
                                        {
                                            (this.props.match.params.accion!=='CO') &&
                                            (<Button 
                                                className="ccargo-btn btn-block"
                                                onClick={this.onSubmit}
                                            >
                                                Registrar
                                            </Button>)
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