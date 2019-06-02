import React from 'react';
import Button from 'react-bootstrap/Button';
// https://react-bootstrap.github.io/components/buttons/
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import {Header} from '../../components/Header';
import {history} from '../../routers/History';


export default class CambiarContrasena extends React.Component {
    constructor(props){
        super(props);
    }
    onClickDashboardPage(){
        history.push('/dashboard');  
    }              
    onClickLoginPage(){
        history.push('/');  
    }                             
    render(){
        return (
            <div>
                <Header />
                    <Container>
                      <Row className="rowG">
                        <Col md={3}></Col>
                        <Col md={6}>
                          <h2 class="text-center">CAMBIAR CONTRASEÑA</h2>
                        </Col>
                        <Col md={3}></Col>
                      </Row>
                      <Row className="rowG">
                        <Col md={3}></Col>
                        <Col md={6}>
                            <Form>
                              <Form.Group as={Row}>
                                <Form.Label column md="4">Contraseña anterior</Form.Label>
                                <Col md="8">
                                    <Form.Control type="password" placeholder="Contraseña anterior" />
                                </Col>
                              </Form.Group>
                              <Form.Group as={Row}>
                                <Form.Label column md="4">Nueva contraseña</Form.Label>
                                <Col md="8">
                                    <Form.Control type="password" placeholder="Nueva contraseña" />
                                </Col>
                              </Form.Group>
                              <Form.Group as={Row}>
                                <Form.Label column md="4">Repetir contraseña</Form.Label>
                                <Col md="8">
                                    <Form.Control type="password" placeholder="Nueva contraseña" />
                                </Col>
                              </Form.Group>
                            </Form>
                        </Col>
                        <Col md={3}></Col>
                      </Row>

                      <Row className="rowG">
                        <Col md={4}></Col>
                        <Col md={4}>
                            <Row>
                                <Col md={6}>
                                    <div class="d-flex justify-content-center">
                                        <Button variant="outline-secondary">Guardar</Button>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div class="d-flex justify-content-center">
                                        <Button variant="outline-secondary">Cancelar</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={4}></Col>
                      </Row>
                    </Container>
            </div>                 
        )
    }
}