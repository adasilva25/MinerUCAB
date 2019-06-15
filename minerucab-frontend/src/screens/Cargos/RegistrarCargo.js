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
import DataTable from '../../components/DataTable'


export default class RegistrarCargo extends React.Component {             
    render(){
        return (
          <div className="contain pagecontent" id="Content">
            <OpcionesGlobales active="Home"/>
            <OpcionesLocales Usuario={'Andrea Da Silva'}/>
              <Container className="container-ccargo-separator pagecontent">
                <Row>
                    <Col md={3}></Col>
                    <Col md={6}>
                        <Row>
                            <Col md={12}>
                                <h5 className="horizontal-line-title ccargo-title">Registrar Cargo</h5>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={3}></Col>
                </Row>
                <div>
                  <Row className="div-content-form-ccargo">
                    <Col md={3}></Col>
                    <Col md={6}>
                      <Form.Row>
                        <Col md={6}>
                          <p className="modal-bc-description-text">
                            Nombre
                          </p>
                        </Col>
                        <Col md={6}>
                          <Form.Control type="password" className="form-input-ccargo" placeholder="Introduzca su contraseña actual" />
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
                  <Row className="div-content-form-ccargo">
                    <Col md={3}></Col>
                    <Col md={6}>
                      <Form.Row>
                        <Col md={6}>
                          <p className="modal-bc-description-text">
                            Descripción
                          </p>
                        </Col>
                        <Col md={6}>
                          <Form.Control type="password" className="form-input-ccargo" placeholder="Introduzca su nueva contraseña" />
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
                  <Row className="div-content-form-ccargo">
                    <Col md={3}></Col>
                    <Col md={6}>
                      <Form.Row>
                        <Col md={6}>
                          <p className="modal-bc-description-text">
                            Roles
                          </p>
                        </Col>
                        <Col md={6}>
                        </Col>
                      </Form.Row>
                    </Col>
                    <Col md={3}></Col>
                  </Row>
                </div>
                <div>
                  <Row className="div-btn-form-ccargo">
                    <Col md={3}></Col>
                    <Col md={3}></Col>
                    <Col md={6}>
                      <Button 
                          className="ccargo-btn btn-block"
                      >
                          Crear
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Container>
            </div>                 
        )
    }
}