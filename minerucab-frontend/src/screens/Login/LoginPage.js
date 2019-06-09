import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {history} from '../../routers/History';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

export default class LoginPage extends React.Component {
    constructor(props){
        super(props);
    }
    onClickDashboardPage(){
        history.push('/dashboard');  
    }              
    onClickLoginPage(){
        history.push('/');  
    }   
    modalClose = () => this.setState({ modalShow: false });                        
    render(){
        return (
            <div className="contain bg">
                <Container className="contain">
                    <Row>
                        <Col md={1}></Col>
                        <Col md={10} className="login-bg">
                            <Row>
                                <Col md={6}>
                                      <Image className="img-fluid" src="/images/MinerUCAB-logo.png" />
                                      <hr className="horizontal-line"></hr>
                                      <h1 className="responsive text-center">¡Bienvenido a MinerUCAB!</h1>
                                      <p className="font-desc text-center lead">
                                          Corporación nacional de desarrollo mineral con 130  años de trayectoria, uno de los  actores clave en los sectores minero - metalúrgico y químico del país.
                                      </p>
                                </Col>
                                <Col md={6} className="vertical-line align-self-center">
                                    <h1 className="text-center">Ingresar</h1>
                                    <Form className="form-signin">
                                    <Form.Group controlId="formBasicEmail" className="formInput">
                                        <Form.Label>Usuario</Form.Label>
                                        <Form.Control type="user" placeholder="Usuario" className="fTest" />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword" className="formInput">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control type="password" placeholder="Contraseña" className="fTest" />
                                    </Form.Group>
                                    <Button 
                                        className="purple-btn text-center" 
                                        size="md" 
                                        block as="input" 
                                        type="submit" 
                                        value="Ingresar" />
                                    </Form>
                                    <p className="text-center">©2019</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={1}>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}