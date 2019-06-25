import React from 'react';
import Button from 'react-bootstrap/Button';
// https://react-bootstrap.github.io/components/buttons/
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import axios from 'axios';
import { history } from '../../routers/History';


export default class GestionarMaquinaria extends React.Component {             
    state = {
        serial: '',
        tipo_maquinaria: '',
        dia: '',
        mes: '',
        ano: '',
        estatus: '',
        disable: false,
        mensajeError: '',
        modalShowEliminar: false
    }
    componentDidMount = () => {
        if (this.props.match.params.option !== 'CR'){
            const config = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                responseType: 'json'
            }
            
            axios.get(`http://localhost:3000/getMaquinariaById/${this.props.match.params.id}`, config)
                .then((res) => {
                    console.log(res);
                    this.setState({ serial: res.data[0].identificador });
                    this.setState({ tipo_maquinaria: res.data[0].fk_tipo_maquinaria });
                    const date = new Date(res.data[0].fecha_adquisicion)
                    const dia = date.getDate()
                    const mes = (date.getMonth() + 1)
                    const ano = date.getFullYear()
                    this.setState({ dia });
                    this.setState({ mes });
                    this.setState({ ano });
                    this.setState({ estatus: res.data[0].fk_estatus });
                }).catch((e) => {
                    console.log('Error en axios')
                    this.setState({ mensajeError: 'Hubo un error conectando a la base de datos. Por favor valide los parámetros enviados' })
                    this.modalErrorOpen()
                })

            if (this.props.match.params.accion === 'CO'){
                this.setState({ disable: true });
            }
        }
    }
    onSubmit = () => {
        const info = {
            serial: '',
            tipo_maquinaria: '',
            dia: '',
            mes: '',
            ano: '',
            estatus: '',
        }

        if ((this.state.serial.length > 0) && (this.state.dia.length > 0) && 
            (this.state.mes.length > 0) && (this.state.ano.length > 0)) {
                
                info.fecha_adquisicion = this.state.mes + '-' + this.state.dia + '-' + this.state.ano;
                
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
                        axios.post('http://localhost:3000/createMaquinaria', config)
                            .then((res) => {
                                console.log(res)
                                history.push('/maquinaria')
                            }).catch((e) => {
                                console.log('catch', e)
                                this.setState({ mensajeError: 'Hubo un error registrando el cliente. Por favor, intente de nuevo y valide sus campos' })
                                this.modalErrorOpen()
                            })
                    }
                    else if (this.props.match.params.accion === 'M'){
                        info.clave = this.props.match.params.id;
                        axios.put('http://localhost:3000/updateMaquinariaById', config)
                        .then((res) => {
                            console.log(res)
                            history.push('/maquinaria')
                        }).catch((e) => {
                            console.log(e)
                            this.setState({ mensajeError: 'Hubo un error actualizando los datos del cliente. Por favor, intente de nuevo y valide sus campos' })
                            this.modalErrorOpen()
                        })
                    }
                }
        }
        else {
            this.setState({ mensajeError: 'Existen campos obligatorios vacíos' })
            this.modalErrorOpen()
        }
    }

    modalErrorClose = () => {
        this.setState({ modalShowEliminar: false });
    }
    modalErrorOpen = () => {
        this.setState({ modalShowEliminar: true })
    };
    onChangeNumber = (e) => {
        const number = e.target.value;

        if ((!number) || number.match(/^[0-9\b]+$/)){
            if (e.target.id === 'dia-maquinaria'){
                if ((e.target.value.length < 3)){
                    this.setState({ dia: e.target.value });
                }
            }
            else if (e.target.id === 'mes-maquinaria'){
                if ((e.target.value.length < 3)){
                    this.setState({ mes: e.target.value });
                }
            }
            else if (e.target.id === 'ano-maquinaria'){
                if ((e.target.value.length < 5)){
                    this.setState({ ano: e.target.value });
                }
            }
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
                    <Row>
                        <Col md={2}></Col>
                        <Col md={9}>
                            <Row>
                                <Col md={11}>
                                    <h5 className="horizontal-line-title cliente-title">{title} Maquinaria</h5>
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
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Información de la Maquinaria</h6>
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
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="cliente-description-fields-text">Serial de la Maquinaria</Form.Label>
                                            <Form.Control type="text" value={this.state.serial} className="form-input" placeholder="Introduzca el serial de la maquinaria" />
                                            <Form.Text className="text-muted">
                                                Obligatorio
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label className="cliente-description-fields-text">Tipo de Maquinaria</Form.Label>
                                            <Form.Control 
                                                as="select"
                                                className="form-input"
                                                value={this.state.tipo_maquinaria}
                                            >
                                                <option>Pulidora</option>
                                                <option>Camión</option>
                                            </Form.Control>
                                            <Form.Text className="text-muted">
                                                Obligatorio
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
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Fecha de Adquisición</Form.Label>
                                            <Row className="div-content-date">
                                                <Form.Control 
                                                    type="text" 
                                                    id="dia-cliente-natural"
                                                    className="form-date form-input form-input-day" 
                                                    placeholder="DD"
                                                    onChange={this.onChangeNumber} 
                                                    value={this.state.dia}
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
                                                />                                            
                                            </Row>
                                            <Form.Text className="text-muted">
                                                Obligatorio
                                            </Form.Text>
                                        </Form.Group>  
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label className="cliente-description-fields-text">Estatus</Form.Label>
                                            <Form.Control 
                                                as="select"
                                                className="form-input"
                                            >
                                                <option>Disponible</option>
                                                <option>Ocupada</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
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
                                        <Button 
                                            className="modal-ventasform-volver-button btn-block" 
                                            onClick={() => history.goBack()}
                                        > 
                                            Volver 
                                        </Button>
                                    </Col>
                                    <Col md={2}></Col>
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