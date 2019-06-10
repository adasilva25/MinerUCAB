import React from 'react';
import Button from 'react-bootstrap/Button';
// https://react-bootstrap.github.io/components/buttons/
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import OpcionesLocales from '../../components/OpcionesLocales';


export default class CambiarContrasena extends React.Component {
    constructor(props){
        super(props);
    }                          
    render(){
        return (
            <div>
              <OpcionesLocales />
              <Container className="container-cc-separator pagecontent">
                <Row>
                    <Col md={3}></Col>
                    <Col md={6}>
                        <Row>
                            <Col md={12}>
                                <h5 className="horizontal-line-title cc-title">Cambiar Contraseña</h5>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={3}></Col>
                </Row>
                <div>
                  <Row className="div-content-form-cc">
                    <Col md={3}></Col>
                    <Col md={6}>
                      <Form.Row>
                        <Col md={6}>
                          <p className="modal-bc-description-text">
                            Contraseña Actual
                          </p>
                        </Col>
                        <Col md={6}>
                          <Form.Control type="password" className="form-input-cc" placeholder="Introduzca su contraseña actual" />
                          <Form.Text className="text-muted">
                              Este campo es obligatorio
                          </Form.Text>
                        </Col>
                      </Form.Row>
                    </Col>
                    <Col md={3}></Col>
                  </Row>
                </div>
                <div>
                  <Row className="div-content-form-cc">
                    <Col md={3}></Col>
                    <Col md={6}>
                      <Form.Row>
                        <Col md={6}>
                          <p className="modal-bc-description-text">
                            Nueva Contraseña
                          </p>
                        </Col>
                        <Col md={6}>
                          <Form.Control type="password" className="form-input-cc" placeholder="Introduzca su nueva contraseña" />
                          <Form.Text className="text-muted">
                              Este campo es obligatorio
                          </Form.Text>
                        </Col>
                      </Form.Row>
                    </Col>
                    <Col md={3}></Col>
                  </Row>
                </div>
                <div>
                  <Row className="div-content-form-cc">
                    <Col md={3}></Col>
                    <Col md={6}>
                      <Form.Row>
                        <Col md={6}>
                          <p className="modal-bc-description-text">
                            Confirmar Contraseña
                          </p>
                        </Col>
                        <Col md={6}>
                          <Form.Control type="password" className="form-input-cc" placeholder="Confirmar su contraseña" />
                          <Form.Text className="text-muted">
                              Este campo es obligatorio
                          </Form.Text>
                        </Col>
                      </Form.Row>
                    </Col>
                    <Col md={3}></Col>
                  </Row>
                </div>
                <div>
                  <Row className="div-btn-form-cc">
                    <Col md={3}></Col>
                    <Col md={3}></Col>
                    <Col md={6}>
                      <Button 
                          className="cc-btn btn-block"
                      >
                          Guardar cambios
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Container>
            </div>                 
        )
    }
}