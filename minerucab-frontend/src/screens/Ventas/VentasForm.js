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
import Spinner from 'react-bootstrap/Spinner'
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';

export default class VentasForm extends React.Component {
    state = {
        minerales: [],
        pedido: [{
            mineral: "Oro",
            cantidad: "0.00"
        }]
    }
    componentDidMount = () => {
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }
        axios.get('http://localhost:3000/minerales', config)
            .then((res) => {
                res.data.forEach(element => {
                    this.setState((prevState) => ({
                        minerales: prevState.minerales.concat(element.nombre)
                    }));
                })
            }).catch((e) => {
                console.log('Error en axios')
            })
    }
    dropdownChange = (e) => {
        console.log(e.target)
        // console.log(document.getElementsByClassName("form-input-dropdown").length)
        
    }
    onSubmit = (e) => {
        console.log(document.getElementsByClassName("form-input-dropdown"));
    }
    addPedido = (e) => {
        const nuevoPedido = {
            mineral: "Oro",
            cantidad: 0
        };

        this.setState((prevState) => ({
            pedido: prevState.pedido.concat(nuevoPedido)
        }));
    }
    renderOptions = (indexF) => {
        return (this.state.minerales.map((optionMin, index) => {
            // indexF++;
            return(<option value={index}>{optionMin}</option>)
        }))
    }
    renderPedido = () => {

        return this.state.pedido.map((option, index) => {
            return (
                <Form.Row className="div-ventas-pedido-form" key={index} id={'form'+index}>
                    <Col md={5}>
                        <Form.Label className="cliente-description-fields-text">Mineral</Form.Label>
                        <Form.Control 
                            as="select" 
                            defaul={this.state.pedido[index].mineral} 
                            key={index} 
                            onChange={this.dropdownChange} 
                            className="form-input form-input-dropdown">
                            {
                                this.renderOptions(index-1)
                            }
                        </Form.Control>
                        <Form.Text className="text-muted">
                            Este campo es obligatorio
                        </Form.Text>
                    </Col>
                    <Col md={1}></Col>
                    <Col md={5}>
                        <Form.Label className="cliente-description-fields-text">Cantidad</Form.Label>
                        <Row>
                            <Col md={10}>
                            <Form.Control type="text" className="form-input" key={index} placeholder="Introduzca la cantidad del mineral" />
                            </Col>
                            <Col md={2}>
                                <InputGroup.Append>
                                    <InputGroup.Text className="input-append-ventas-form">kg</InputGroup.Text>
                                </InputGroup.Append>
                            </Col>
                        </Row>
                        <Form.Text className="text-muted">
                            Este campo es obligatorio
                        </Form.Text>
                    </Col>
                </Form.Row>
            )
            
        })
    }

    render(){

        return (
            <div className="div-screen-resize">
                <OpcionesLocales />
                <Container className="pagecontent">
                    <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={10}>
                                    <h4 className="horizontal-line-title-ventas-form cliente-title">Detalle de Venta</h4>
                                </Col>
                                <Col md={2}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={10}>
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Información del Cliente</h6>
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
                                            <Form.Label className="cliente-description-fields-text">Cédula de Identidad o RIF</Form.Label>
                                            <Form.Control type="text" className="form-input" value="V-26.435.741" disabled={true} placeholder="Introduzca su primer nombre" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="cliente-description-fields-text">Nombre del Cliente</Form.Label>
                                            <Form.Control type="text" className="form-input" value="Andrea Da Silva" disabled={true} placeholder="Introduzca su primer apellido" />
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
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Detalle de Pedido</h6>
                                </Col>
                                <Col md={2}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <Row className="div-content-form">
                            <Col md={2} ></Col>
                            <Col md={9}>
                            {
                                this.renderPedido()
                            }
                            </Col>
                            <Col md={1}></Col>
                        </Row>
                    </div>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={10}>
                                    <h6 className="horizontal-line-ventas-form"></h6>
                                </Col>
                                <Col md={2}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <Row className="div-content-form">
                            <Col md={2}></Col>
                            <Col md={9}>
                                <Row>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Button 
                                            className="ventas-form-btn btn-block"
                                            onClick={this.addPedido}
                                        >
                                            Agregar
                                        </Button>
                                    </Col>
                                </Row>
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
                                            onSubmit={this.onSubmit}
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