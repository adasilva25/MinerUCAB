import React from 'react';
import Button from 'react-bootstrap/Button';
// https://react-bootstrap.github.io/components/buttons/
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';


export default class RegistrarClienteJuridico extends React.Component {             
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
                                    <h5 className="horizontal-line-title cliente-title">Registrar Cliente Jurídico</h5>
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
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="cliente-description-fields-text">Nombre de la Empresa</Form.Label>
                                            <Form.Control type="text" className="form-input" placeholder="Introduzca el nombre de la empresa" />
                                            <Form.Text className="text-muted">
                                                Este campo es obligatorio
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label className="cliente-description-fields-text">Área de Trabajo</Form.Label>
                                            <Form.Control as="textarea" rows="1" className="form-input-juridico-textarea" placeholder="Introduzca el área de trabajo de la empresa"/>
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
                                            <Form.Label className="cliente-description-fields-text">RIF</Form.Label>
                                            <Row className="div-content-date">
                                                <Form.Control as="select" className="form-input form-ci-type">
                                                    <option>J</option>
                                                </Form.Control>   
                                                <Form.Control type="text" className="form-input form-ci-number" placeholder="Introduzca el RIF de la empresa"/>                                       
                                            </Row>  
                                            <Form.Text className="text-muted">
                                                Este campo es obligatorio
                                            </Form.Text> 
                                        </Form.Group>   
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={6}>
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
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Ubicación de la Empresa</h6>
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
                                    <Col md={12}>
                                        <Form.Row className="div-ventas-pedido-form">
                                            <Col md={3}>
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
                                            <Col md={1}></Col>
                                            <Col md={3}>
                                                <Form.Label className="cliente-description-fields-text">Municipio</Form.Label>
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
                                            <Col md={1}></Col>
                                            <Col md={3}>
                                                <Form.Label className="cliente-description-fields-text">Parroquia</Form.Label>
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