import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { login } from '../../actions/user';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {history} from '../../routers/History';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ModalAdvertencia from '../../components/ModalAdvertencia';

export class LoginPage extends React.Component {
    state = {
        user: '',
        password: '',
        modalShowEliminar: false,
        mensajeError: ''
    }
    componentWillMount = () => {
        localStorage.removeItem('user');
    }
    modalErrorClose = () => {
        this.setState({ modalShowEliminar: false, reload: true });
    }
    modalErrorOpen = () => {
        this.setState({ modalShowEliminar: true })
    };
    onSubmit = () => {

        if ((this.state.user.length > 0) && (this.state.password.length > 0)){
            const user = {
                user: this.state.user,
                password: this.state.password
            }
    
            const config = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                responseType: 'json',
                data: user
            }
            
            axios.post('http://localhost:3000/validateUser', config)
                .then((res) => {
                    console.log(res)
                    if (res.data.length > 0){

                        res.data.user = this.state.user;
                        res.data.password = this.state.password;
                        console.log(res)
                        this.props.login(res.data)
                        localStorage.setItem('user', JSON.stringify(res.data))
                        history.push('/home')
                    }
                    else{
                        this.setState({ mensajeError: 'Combinación de usuario y contraseña inválidos', modalShowEliminar: true })
                        this.modalErrorOpen()
                    }
                }).catch((e) => {
                    this.setState({ mensajeError: 'Usuario inválido', modalShowEliminar: true })
                    this.modalErrorOpen()
                })
        }
        else {
            this.setState({ mensajeError: 'Existen campos obligatorios vacíos', modalShowEliminar: true })
            this.modalErrorOpen()
        }
    }
    modalClose = () => this.setState({ modalShow: false });                        
    render(){
        return (
            <div className="contain bg">
                <ModalAdvertencia
                    show={this.state.modalShowEliminar}
                    onHide={this.modalErrorClose}
                    infoeliminar={this.state.mensajeError}
                    mensaje={''}
                />
                <Container className="contain">
                    <Row>
                        <Col md={1}></Col>
                        <Col md={10} className="login-bg">
                            <Row>
                                <Col md={6}>
                                      <Image className="img-fluid imgbg" src="/images/MinerUCAB-logo.png" />
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
                                        <Form.Control 
                                            type="user" 
                                            value={this.state.user} 
                                            placeholder="Usuario" 
                                            className="fTest" 
                                            onChange={(e) => this.setState({ user: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword" className="formInput">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control 
                                            type="password"
                                            value={this.state.password} 
                                            placeholder="Contraseña" 
                                            className="fTest" 
                                            onChange={(e) => this.setState({ password: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Button 
                                        className="purple-btn text-center" 
                                        size="md" 
                                        block as="input" 
                                        value="Ingresar"
                                        onClick={this.onSubmit}
                                     />
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

const mapDispatchToProps = (dispatch, props) => ({
    login: (user) => dispatch(login(user))
})

export default connect(undefined, mapDispatchToProps)(LoginPage)