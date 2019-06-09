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


export default class RegistrarClienteNatural extends React.Component {             
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
                                            <Form.Label className="cliente-description-fields-text">Segundo Nombre</Form.Label>
                                            <Form.Control type="text" className="form-input" placeholder="Introduzca su segundo nombre" />
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
                                            <Form.Label className="cliente-description-fields-text">Primer Apellido</Form.Label>
                                            <Form.Control type="text" className="form-input" placeholder="Introduzca su primer apellido" />
                                        </Form.Group>
                                        <Form.Text className="text-muted">
                                            Este campo es obligatorio
                                        </Form.Text> 
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
                                    <Col md={6}>
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
                                            <Form.Label className="cliente-description-fields-text">Número Telefónico</Form.Label>
                                            <Form.Control type="text" className="form-input" placeholder="Introduzca un teléfono de contacto" />
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
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Dirección</h6>
                                </Col>
                                <Col md={2}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <Row className="div-content-form div-content-form-end-rc">
                            <Col md={2}></Col>
                            <Col md={9}>
                                <Form.Row>
                                    <Col md={6}>
                                        <Form.Row className="div-ventas-pedido-form">
                                            <Col md={5}>
                                                <Form.Label className="cliente-description-fields-text">Estado</Form.Label>
                                                <Form.Control 
                                                    as="select" 
                                                    className="form-input"
                                                >
                                                    <option>Sucre</option>
                                                    <option>Distrito Capital</option>
                                                    <option>Amazonas</option>
                                                    <option>Apure</option>
                                                    <option>Barinas</option>
                                                </Form.Control>
                                            </Col>
                                            <Col md={5}>
                                                <Form.Label className="cliente-description-fields-text">Ciudad</Form.Label>
                                                <Form.Control 
                                                    as="select"
                                                    className="form-input"
                                                >
                                                    <option>Caracas</option>
                                                    <option>Cumaná</option>
                                                    <option>San Fernando de Apure</option>
                                                    <option>Tucupita</option>
                                                    <option>Portuguesa</option>
                                                    <option>Guanare</option>
                                                    <option>Barinas</option>
                                                    <option>La Guaira</option>
                                                    <option>Barquisimeto</option>
                                                </Form.Control>
                                            </Col>
                                            <Col md={2}></Col>
                                        </Form.Row>
                                    </Col>
                                    <Col md={6}> 
                                        <Form.Row className="div-ventas-pedido-form">
                                            <Col md={5}>
                                                <Form.Label className="cliente-description-fields-text">Municipio</Form.Label>
                                                <Form.Control 
                                                    as="select" 
                                                    className="form-input"
                                                >
                                                    <option>Sucre</option>
                                                    <option>Baruta</option>
                                                    <option>Chacao</option>
                                                    <option>Libertador</option>
                                                    <option>Guaicaipuro</option>
                                                </Form.Control>
                                            </Col>
                                            <Col md={5}>
                                                <Form.Label className="cliente-description-fields-text">Parroquia</Form.Label>
                                                <Form.Control 
                                                    as="select"
                                                    className="form-input"
                                                >
                                                    <option>Santa Mónica</option>
                                                    <option>Coche</option>
                                                    <option>El Valle</option>
                                                </Form.Control>
                                            </Col>
                                            <Col md={2}></Col>
                                        </Form.Row>
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