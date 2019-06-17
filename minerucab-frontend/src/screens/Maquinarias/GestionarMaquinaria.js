import React from 'react';
import Button from 'react-bootstrap/Button';
// https://react-bootstrap.github.io/components/buttons/
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import OpcionesLocales from '../../components/OpcionesLocales';
import axios from 'axios';


export default class GestionarMaquinaria extends React.Component {             
    state = {
        serial: '',
        dia: '',
        mes: '',
        ano: '',
        estatus: ''
    }
    componentDidMount = () => {
        // if (this.props.match.params.option !== 'CR'){
        //     const config = {
        //         headers: {
        //           'Content-Type': 'application/x-www-form-urlencoded'
        //         },
        //         responseType: 'json'
        //     }
            
        //     axios.get(`http://localhost:3000/getClienteById/${this.props.match.params.id}`, config)
        //         .then((res) => {
        //             console.log(res);
        //             this.setState({ primerNombre: res.data[0].nombre });
        //             this.setState({ primerApellido: res.data[0].apellido });
        //             this.setState({ ci: res.data[0].ci });
        //             this.setState({ tlf: res.data[0].tlf });
        //         }).catch((e) => {
        //             console.log('Error en axios')
        //         })
        // }
    }
    onChangeNumber = () => {

    }
    render(){
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
                                    <h5 className="horizontal-line-title cliente-title">Registrar Maquinaria</h5>
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
                                            <Form.Control type="text" className="form-input" placeholder="Introduzca el serial de la maquinaria" />
                                            <Form.Text className="text-muted">
                                                Este campo es obligatorio
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
                                            >
                                                <option>Pulidora</option>
                                                <option>Camión</option>
                                            </Form.Control>
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
                                                Este campo es obligatorio
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
                                                <option>Dañada</option>
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
                                    </Col>
                                    <Col md={2}></Col>
                                    <Col md={5}>
                                        <Button 
                                            className="ccargo-btn btn-block"
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