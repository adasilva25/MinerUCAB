import React from 'react';
import Button from 'react-bootstrap/Button';
// https://react-bootstrap.github.io/components/buttons/
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {history} from '../../routers/History';

export default class CambiarContrasena extends React.Component {
    constructor(props){
        super(props);
    }
    getUsers(){
        
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
                <div align="center">
                <h2>CAMBIAR CONTRASEÑA</h2>
                <div className="prueba" align="center">
                    <Form>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                            Contraseña anterior
                            </Form.Label>
                            <Col sm={4}>
                            <Form.Control type="contrasena_anterior" placeholder="Contraseña anterior" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                            Nueva contraseña
                            </Form.Label>
                            <Col sm={4}>
                            <Form.Control type="nueva_contraseña" placeholder="Introduzca su nueva contraseña" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                            Repetir contraseña
                            </Form.Label>
                            <Col sm={4}>
                            <Form.Control type="repetir_contraseña" placeholder="Repita su nueva contraseña" />
                            </Col>
                        </Form.Group>

                    </Form>
                </div>

                <Button variant="light">Guardar</Button>
                <Button variant="light">Cancelar</Button>
            
                </div>
            </div>
        )
    }
}