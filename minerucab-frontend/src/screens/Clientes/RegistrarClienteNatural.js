import React from 'react';
import Button from 'react-bootstrap/Button';
// https://react-bootstrap.github.io/components/buttons/
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FormLugar from '../../components/FormLugar';
import FormLugarPred from '../../components/FormLugarPred';
import {history} from '../../routers/History';
import ModalAdvertencia from '../../components/ModalAdvertencia';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import axios from 'axios';


export default class RegistrarClienteNatural extends React.Component {             
    state = {
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        dia: '',
        mes: '',
        ano: '',
        tlf: '',
        ci: '',
        correo: '',
        tipo_ci: '',
        fk_lugar: '',
        disable: false,
        mensajeError: '',
        modalShowEliminar: false
    }
    componentDidMount = () => {
        if (this.props.match.params.accion !== 'CR'){
            const config = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                responseType: 'json'
            }
            
            axios.get(`http://localhost:3000/getClienteById/${this.props.match.params.id}`, config)
                .then((res) => {
                    console.log(res);
                    this.setState({ primerNombre: res.data[0].p_nombre });
                    this.setState({ segundoNombre: res.data[0].s_nombre });
                    this.setState({ primerApellido: res.data[0].p_apellido });
                    this.setState({ segundoApellido: res.data[0].s_apellido });
                    this.setState({ ci: res.data[0].ci.slice(1) });
                    this.setState({ tipo_ci: res.data[0].ci[0] });
                    this.setState({ correo: res.data[0].email });
                    this.setState({ tlf: res.data[0].telefono });
                    this.setState({ fk_lugar: res.data[0].fk_lugar });
                    const date = new Date(res.data[0].fecha_nacimiento)
                    const dia = date.getDate()
                    const mes = (date.getMonth() + 1)
                    const ano = date.getFullYear()
                    this.setState({ dia });
                    this.setState({ mes });
                    this.setState({ ano });
                    if (this.props.match.params.accion !== 'CR'){
                        document.getElementsByClassName('form-ci-type')[0].value = this.state.tipo_ci
                        if (this.props.match.params.accion === 'CO'){
                            this.setState({ disable: true });
                        }
                    }
                }).catch((e) => {
                    console.log('Error en axios')
                    this.setState({ mensajeError: 'Hubo un error conectando a la base de datos. Por favor valide los parámetros enviados' })
                    this.modalErrorOpen()
                })
        }
    }
    modalErrorClose = () => {
        this.setState({ modalShowEliminar: false });
    }
    modalErrorOpen = () => {
        this.setState({ modalShowEliminar: true })
    };
    onSubmit = (e) => {
        const info = {
            p_nombre: '',
            s_nombre: '',
            p_apellido: '',
            s_apellido: '',
            ci: '',
            fecha_nacimiento: '',
            email: '',
            telefono: '',
            fk_lugar: ''
        }

        if ((this.state.primerNombre.length > 0) && (this.state.primerApellido.length > 0) &&
            (this.state.ci.length > 0) && (this.state.dia.toString().length > 0) && (this.state.mes.toString().length > 0) &&
            (this.state.ano.toString().length > 0) && (this.state.correo.length > 0) && (this.state.tlf.length > 0)){
                console.log('paso el if')
                info.p_nombre = this.state.primerNombre[0].toUpperCase() + this.state.primerNombre.substring(1,this.state.primerNombre.length).toLowerCase();

                if ((this.state.segundoNombre === '') || (this.state.segundoNombre === null)){
                    info.s_nombre = null;
                }   
                else{
                    info.s_nombre = this.state.segundoNombre[0].toUpperCase() + this.state.segundoNombre.substring(1,this.state.segundoNombre.length).toLowerCase();
                }
                
                info.p_apellido = this.state.primerApellido[0].toUpperCase() + this.state.primerApellido.substring(1,this.state.primerApellido.length).toLowerCase();
                
                if ((this.state.segundoApellido === '') || (this.state.segundoApellido === null)){
                    info.s_apellido = null;
                }   
                else{
                    info.s_apellido = this.state.segundoApellido[0].toUpperCase() + this.state.segundoApellido.substring(1,this.state.segundoApellido.length).toLowerCase();
                }
                
                info.ci = document.getElementsByClassName('form-ci-type')[0].value + this.state.ci;
                info.fecha_nacimiento = this.state.mes + '-' + this.state.dia + '-' + this.state.ano;
                info.email = this.state.correo;
                info.telefono = this.state.tlf;
                info.fk_lugar = document.getElementById('LugarParroquia').value;

                console.log('info', info);

                if ((this.state.dia > 31) || (this.state.dia < 1) || (this.state.mes > 12) || (this.state.mes < 1) || (this.state.ano > 2019)){
                    this.setState({ mensajeError: '¡Fecha inválida!' })
                    this.modalErrorOpen()
                }
                else {
                    const config = {
                        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        responseType: 'json',
                        data: info
                    }
                    
                    if (this.props.match.params.accion === 'CR'){
                        axios.post('http://localhost:3000/createClienteNatural', config)
                            .then((res) => {
                                console.log(res)
                                this.props.history.push('/cliente')
                            }).catch((e) => {
                                console.log('catch', e)
                                this.setState({ mensajeError: 'Hubo un error registrando el cliente. Por favor, intente de nuevo y valide sus campos' })
                                this.modalErrorOpen()
                            })
                    }
                    else if (this.props.match.params.accion === 'M'){
                        info.clave = this.props.match.params.id;
                        axios.put('http://localhost:3000/updateClienteNaturalById', config)
                        .then((res) => {
                            console.log(res)
                            this.props.history.push('/cliente')
                        }).catch((e) => {
                            console.log(e)
                            this.setState({ mensajeError: 'Hubo un error actualizando los datos del cliente. Por favor, intente de nuevo y valide sus campos' })
                            this.modalErrorOpen()
                        })
                    }
                }
        }
        else {
            console.log(this.state)
            console.log('this.state.primerNombre.length', this.state.primerNombre.length)
            console.log('this.state.primerApellido.length', this.state.primerApellido.length)
            console.log('this.state.ci', this.state.ci.length)
            console.log('this.state.dia.length', this.state.dia.length)
            console.log('this.state.mes.length', this.state.mes.length)
            console.log('this.state.ano.length', this.state.ano.length)
            this.setState({ mensajeError: 'Existen campos obligatorios vacíos' })
            this.modalErrorOpen()
        }
    }
    onChangeText = (e) => {
        const text = e.target.value;
        
        if (!text || text.match(/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/) ) {
            if (e.target.id === 'primerNombre-cliente-natural'){
                this.setState({ primerNombre: e.target.value });
            }
            if (e.target.id === 'segundoNombre-cliente-natural'){
                this.setState({ segundoNombre: e.target.value });
            }
            if (e.target.id === 'primerApellido-cliente-natural'){
                this.setState({ primerApellido: e.target.value });
            }
            if (e.target.id === 'segundoApellido-cliente-natural'){
                this.setState({ segundoApellido: e.target.value });
            }
        }
    }
    onChangeNumber = (e) => {
        const number = e.target.value;

        if ((!number) || number.match(/^[0-9\b]+$/)){
            if (e.target.id === 'dia-cliente-natural'){
                if ((e.target.value.length < 3)){
                    this.setState({ dia: e.target.value });
                }
            }
            else if (e.target.id === 'mes-cliente-natural'){
                if ((e.target.value.length < 3)){
                    this.setState({ mes: e.target.value });
                }
            }
            else if (e.target.id === 'ano-cliente-natural'){
                if ((e.target.value.length < 5)){
                    this.setState({ ano: e.target.value });
                }
            }
            else if (e.target.id === 'ci-cliente-natural'){
                this.setState({ ci: e.target.value });
            }
            else {
                this.setState({ tlf: e.target.value });
            }
        }
    }
    renderLugar = () => {
        if(this.props.match.params.accion !== 'CR'){
            if (this.state.fk_lugar){
                return (<FormLugarPred idParroquia={this.state.fk_lugar} predet={true} accion={this.props.match.params.accion}/>)
            }
        }
        else{
            return (<FormLugar />) //predet={false}
        }
    }
    render(){
        let title;

        if (this.props.match.params.accion === 'CO'){
            title = 'Consultar'
        }
        else if(this.props.match.params.accion === 'CR'){
            title = 'Registrar'
        }
        else if(this.props.match.params.accion === 'M'){
            title = 'Modificar'
        }
        return (
            <div className="contain pagecontent" id="Content">
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario='Andrea Da Silva'/>
                <Container>
                <ModalAdvertencia
                    show={this.state.modalShowEliminar}
                    onHide={this.modalErrorClose}
                    infoeliminar={this.state.mensajeError}
                    mensaje={''}
                />
                    <Row>
                        <Col md={2}></Col>
                        <Col md={9}>
                            <Row>
                                <Col md={11}>
                                    <h5 className="horizontal-line-title cliente-title">{title} Cliente Natural</h5>
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
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Información Personal</h6>
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
                                            <Form.Label className="cliente-description-fields-text">Primer Nombre</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                className="form-input" 
                                                id="primerNombre-cliente-natural"
                                                value={this.state.primerNombre} 
                                                placeholder="Introduzca su primer nombre"
                                                autoFocus={!this.state.disable}
                                                disabled={this.state.disable}
                                                onChange={this.onChangeText} 
                                            />
                                            {!this.state.disable && <Form.Text className="text-muted"> Obligatorio</Form.Text>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group >
                                            <Form.Label className="cliente-description-fields-text">Segundo Nombre</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                id="segundoNombre-cliente-natural"
                                                className="form-input" 
                                                value={this.state.segundoNombre} 
                                                onChange={this.onChangeText} 
                                                disabled={this.state.disable}
                                                placeholder={title !== 'Consultar' ? "Introduzca su segundo nombre" : ''}
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
                                            <Form.Label className="cliente-description-fields-text">Primer Apellido</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                id="primerApellido-cliente-natural"
                                                className="form-input" 
                                                value={this.state.primerApellido} 
                                                placeholder="Introduzca su primer apellido" 
                                                onChange={this.onChangeText} 
                                                disabled={this.state.disable}
                                            />
                                        </Form.Group>
                                        {!this.state.disable && <Form.Text className="text-muted"> Obligatorio</Form.Text>}
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Segundo Apellido</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                id="segundoApellido-cliente-natural"
                                                className="form-input" 
                                                value={this.state.segundoApellido} 
                                                placeholder={title !== 'Consultar' ? "Introduzca su segundo apellido" : ''}
                                                onChange={this.onChangeText} 
                                                disabled={this.state.disable}
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
                                                <Form.Control as="select" className="form-input form-ci-type" disabled={this.state.disable}>
                                                    <option>V</option>
                                                    <option>E</option>
                                                </Form.Control>   
                                                <Form.Control 
                                                    type="text" 
                                                    className="form-input form-ci-number" 
                                                    id='ci-cliente-natural'
                                                    placeholder="Introduzca su cédula de identidad"
                                                    value={this.state.ci}
                                                    onChange={this.onChangeNumber}
                                                    disabled={this.state.disable}
                                                />                                       
                                            </Row>  
                                            {!this.state.disable && <Form.Text className="text-muted"> Obligatorio</Form.Text>}
                                        </Form.Group>   
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Fecha de Nacimiento</Form.Label>
                                                <Row className="div-content-date">
                                                    <Form.Control 
                                                        type="text" 
                                                        id="dia-cliente-natural"
                                                        className="form-date form-input form-input-day" 
                                                        placeholder="DD"
                                                        onChange={this.onChangeNumber} 
                                                        value={this.state.dia}
                                                        disabled={this.state.disable}
                                                    />                                                    
                                                        <Form.Text className="text-muted">
                                                            _
                                                        </Form.Text>
                                                    <Form.Control 
                                                        type="text" 
                                                        className="form-date form-input" 
                                                        placeholder="MM" 
                                                        id="mes-cliente-natural"
                                                        onChange={this.onChangeNumber} 
                                                        value={this.state.mes}
                                                        disabled={this.state.disable}
                                                    />                                                    
                                                        <Form.Text className="text-muted">
                                                            _
                                                        </Form.Text>
                                                    <Form.Control 
                                                        type="text" 
                                                        id="ano-cliente-natural"
                                                        className="form-date form-input" 
                                                        onChange={this.onChangeNumber} 
                                                        placeholder="YYYY" 
                                                        value={this.state.ano}
                                                        disabled={this.state.disable}
                                                    />                                            
                                                </Row>
                                                {!this.state.disable && <Form.Text className="text-muted"> Obligatorio</Form.Text>}
                                        </Form.Group>
                                    </Col>
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
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Detalles de Contacto</h6>
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
                                        <Form.Group >
                                            <Form.Label className="cliente-description-fields-text">Correo Electrónico</Form.Label>
                                            <Form.Control 
                                                type="email" 
                                                className="form-input" 
                                                id='correo-cliente-natural'
                                                placeholder="Introduzca su correo electrónico" 
                                                value={this.state.correo}
                                                onChange={(e) => this.setState({ correo: e.target.value.trim() })}
                                                disabled={this.state.disable}
                                            />
                                            {!this.state.disable && <Form.Text className="text-muted"> Obligatorio</Form.Text>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}> 
                                        <Form.Group >
                                            <Form.Label className="cliente-description-fields-text">Número Telefónico</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                id='tlf-cliente-natural' 
                                                className="form-input" 
                                                placeholder="Introduzca un teléfono de contacto" 
                                                onChange={this.onChangeNumber}
                                                disabled={this.state.disable}
                                                value={this.state.tlf}
                                            />
                                        </Form.Group>
                                        {!this.state.disable && <Form.Text className="text-muted"> Obligatorio</Form.Text>}
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
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Dirección</h6>
                                </Col>
                                <Col md={2}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <Row>
                            <Col md={2}></Col>
                            <Col md={8}>
                                {this.renderLugar()}
                            </Col>
                            <Col md={2}></Col>
                        </Row>
                    </div>
                    <div className="div-content-form">
                        <Row className="div-content-form-end-rc">
                            <Col md={2}></Col>
                            <Col md={9}>
                                <Row>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Button 
                                            className="modal-ventasform-volver-button btn-block" 
                                            onClick={() => history.goBack()}
                                        > 
                                            Volver 
                                        </Button>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                    {
                                        this.props.match.params.accion !== 'CO' && (<Button className="modal-ventasform-enviar-button btn-block" onClick={this.onSubmit}> Enviar </Button>)
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