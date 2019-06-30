import React from 'react';
import Button from 'react-bootstrap/Button';
// https://react-bootstrap.github.io/components/buttons/
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FormLugar from '../../components/FormLugar';
import FormLugarPred from '../../components/FormLugarPred';
import ModalAdvertencia from '../../components/ModalAdvertencia';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import axios from 'axios';
import { history } from '../../routers/History';
// https://www.wlaurance.com/2018/09/node-postgres-insert-multiple-rows/
// https://node-postgres.com/features/queries

export default class RegistrarClienteJuridico extends React.Component { 
    state = {
        nombre: '',
        rif: '',
        correo: '',
        tlf: '',
        tipo_rif: '',
        fk_lugar: '',
        disable: false,
        mensajeError: '',
        modalShowEliminar: false
    }   
    componentDidMount = () => {
        if (this.props.match.params.accion !== 'CR'){
            if (this.props.match.params.accion === 'CO'){
                this.setState({ disable: true });
            }
            const config = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                responseType: 'json'
            }
            
            axios.get(`http://localhost:3000/getClienteJuridicoById/${this.props.match.params.id}`, config)
                .then((res) => {
                    console.log(res);
                    this.setState({ nombre: res.data[0].nombre });
                    this.setState({ rif: res.data[0].rif.slice(1) });
                    this.setState({ tipo_rif: res.data[0].rif[0] });
                    this.setState({ correo: res.data[0].email });
                    this.setState({ tlf: res.data[0].telefono });
                    this.setState({ fk_lugar: res.data[0].fk_lugar });
                }).catch((e) => {
                    console.log('Error en axios')
                })
        }
    }  
    modalErrorClose = () => {
        this.setState({ modalShowEliminar: false });
    }
    modalErrorOpen = () => {
        this.setState({ modalShowEliminar: true })
    } 
    onSubmit = (e) => {
        const info = {
            nombre: '',
            rif: '',
            email: '',
            telefono: '',
            fk_lugar: ''
        };

        console.log('info', info);

        if ((this.state.nombre.length > 0) && (this.state.rif.length > 0) && 
            (this.state.correo.length > 0) && (this.state.tlf > 0)){
                
                info.nombre = this.state.nombre;
                info.rif = document.getElementById('tipo-rif').value + this.state.rif;
                info.email = this.state.correo;
                info.telefono = this.state.tlf;
                info.fk_lugar = document.getElementById('LugarParroquia').value;

                console.log('info', info);

                const config = {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    responseType: 'json',
                    data: info
                }

                if(this.props.match.params.accion === 'CR'){
                    axios.post('http://localhost:3000/createClienteJuridico', config)
                    .then((res) => {
                        console.log(res)
                        this.props.history.push('/cliente')
                    }).catch((e) => {
                        console.log(e)
                        this.setState({ mensajeError: 'Hubo un error registrando el cliente. Por favor, intente de nuevo y valide sus campos' })
                        this.modalErrorOpen()
                    })
                }
                else if (this.props.match.params.accion === 'M'){
                    info.clave = this.props.match.params.id;
                    axios.put('http://localhost:3000/updateClienteJuridicoById', config)
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
        else{
            this.setState({ mensajeError: 'Existen campos obligatorios vacíos' })
            this.modalErrorOpen()
        }
    }
    onChangeText = (e) => {
        const text = e.target.value;
        
        if (!text || text.match(/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$\s/)) {
            if (e.target.id === 'nombre'){
                this.setState({ nombre: e.target.value });
            }
        }
    }
    onChangeNumber = (e) => {
        const number = e.target.value;

        if ((!number) || number.match(/^[0-9\b]+$/)){
            if (e.target.id === 'rif'){
                this.setState({ rif: e.target.value });
            }
            else if (e.target.id === 'tlf'){
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
                <OpcionesLocales Usuario={'Andrea Da Silva'}/>
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
                                    <h5 className="horizontal-line-title cliente-title">{title} Cliente Jurídico</h5>
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
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Información de la Empresa</h6>
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
                                            <Form.Label className="cliente-description-fields-text">Nombre de la Empresa</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                autoFocus
                                                id="nombre" 
                                                className="form-input" 
                                                placeholder="Introduzca el nombre de la empresa" 
                                                value={this.state.nombre}
                                                onChange={(e) => this.setState({ nombre: e.target.value })}
                                                disabled={this.state.disable}
                                            />
                                            {!this.state.disable && <Form.Text className="text-muted"> Obligatorio</Form.Text>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">RIF</Form.Label>
                                            <Row className="div-content-date">
                                                <Form.Control as="select" 
                                                    className="form-input form-ci-type" 
                                                    id="tipo-rif"
                                                    value={this.state.tipo_rif}
                                                    disabled={this.state.disable}
                                                    onChange={(e) => this.setState({ tipo_rif: e.target.value })}
                                                    >
                                                    <option>J</option>
                                                </Form.Control>   
                                                <Form.Control 
                                                    id="rif"
                                                    type="text" 
                                                    className="form-input form-ci-number" 
                                                    placeholder="Introduzca el RIF de la empresa"
                                                    disabled={this.state.disable}
                                                    value={this.state.rif}
                                                    onChange={this.onChangeNumber}
                                                />                                       
                                            </Row>  
                                            {!this.state.disable && <Form.Text className="text-muted"> Obligatorio</Form.Text>}
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
                                                id="email"
                                                className="form-input" 
                                                placeholder="Introduzca su correo electrónico"
                                                value={this.state.correo} 
                                                disabled={this.state.disable}
                                                onChange={(e) => this.setState({ correo: e.target.value.trim() })}
                                            />
                                            {!this.state.disable && <Form.Text className="text-muted"> Obligatorio</Form.Text>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}> 
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Número Telefónico</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                id="tlf"
                                                className="form-input" 
                                                placeholder="Introduzca un teléfono de contacto" 
                                                value={this.state.tlf} 
                                                disabled={this.state.disable}
                                                onChange={this.onChangeNumber}
                                            />
                                            {!this.state.disable && <Form.Text className="text-muted"> Obligatorio</Form.Text>}
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
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Ubicación de la Empresa</h6>
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
                                            onClick={() => this.props.history.goBack()}
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