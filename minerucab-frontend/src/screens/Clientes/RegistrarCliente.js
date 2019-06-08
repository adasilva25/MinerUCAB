import React from 'react';
import Button from 'react-bootstrap/Button';
// https://react-bootstrap.github.io/components/buttons/
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import {history} from '../../routers/History';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';


export default class RegistrarCliente extends React.Component {             
    render(){
        return (
            <div className="contain">
                <OpcionesLocales />
                <Container>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={9}>
                            <Row>
                                <Col md={11}>
                                    <h5 className="horizontal-line-title cliente-title">Registrar Cliente Natural</h5>
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
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="cliente-description-fields-text">Primer Nombre</Form.Label>
                                            <Form.Control type="text" className="form-input" placeholder="Introduzca su primer nombre" />
                                            <Form.Text className="text-muted">
                                                Este campo es obligatorio
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="cliente-description-fields-text">Primer Apellido</Form.Label>
                                            <Form.Control type="text" className="form-input" placeholder="Introduzca su primer apellido" />
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
                                    <Col md={5}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="cliente-description-fields-text">Segundo Nombre</Form.Label>
                                            <Form.Control type="text" className="form-input" placeholder="Introduzca su segundo nombre" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="cliente-description-fields-text">Segundo Apellido</Form.Label>
                                            <Form.Control type="text" className="form-input" placeholder="Introduzca su segundo apellido" />
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
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="cliente-description-fields-text">Correo Electrónico</Form.Label>
                                            <Form.Control type="email" className="form-input" placeholder="Introduzca su correo electrónico" />
                                            <Form.Text className="text-muted">
                                                Este campo es obligatorio
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="cliente-description-fields-text">Cédula de Identidad</Form.Label>
                                            <Row className="div-content-date">
                                                <Form.Control as="select" className="form-input form-ci-type">
                                                    <option>V</option>
                                                    <option>E</option>
                                                    <option>J</option>
                                                </Form.Control>   
                                                <Form.Control type="text" className="form-input form-ci-number" placeholder="Introduzca su cédula de identidad"/>                                       
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
                                    <Col md={5}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="cliente-description-fields-text">Fecha de Nacimiento</Form.Label>
                                                <Row className="div-content-date">
                                                    <Form.Control type="text" className="form-date form-input form-input-day" placeholder="DD" />                                                    
                                                        <Form.Text className="text-muted">
                                                            _
                                                        </Form.Text>
                                                    <Form.Control type="text" className="form-date form-input" placeholder="MM" />                                                    
                                                        <Form.Text className="text-muted">
                                                            _
                                                        </Form.Text>
                                                    <Form.Control type="text" className="form-date form-input" placeholder="YYYY" />                                            
                                                </Row>
                                                <Form.Text className="text-muted">
                                                    Este campo es obligatorio
                                                </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}> </Col>
                                    <Col md={1}></Col>
                                </Form.Row>
                            </Col>
                            <Col md={1}></Col>
                        </Row>
                    </div>
                    <div>
                        <Row>
                            <Col md={2}></Col>
                            <Col md={9}>
                                <Row>
                                    <Col md={5}>
                                        <Button variant="link" className="cliente-reset">Borrar todo</Button>
                                    </Col>
                                    <Col md={2}></Col>
                                    <Col md={5}>
                                        <Button 
                                            className="cliente-btn btn-block"
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