import React from 'react';
import {Header} from '../../components/Header';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import OpcionesLocales from '../../components/OpcionesLocales';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default class Ventas extends React.Component {
    state = {
        index: 0,
        direction: null,
    };
    handleSelect(selectedIndex, e) {
      this.setState({
        index: selectedIndex,
        direction: e.direction,
      });
    }
    render(){
        const { index, direction } = this.state;

        var opciones = [
            {
                nombre: 'Consultar',
                link:'#45',
                active:true
            },

            {
                nombre: 'Agregar',
                link:'#link50',
                active:false
            },

            {
                nombre: 'Modificar',
                link:'#link54',
                active:false
            }
        ];

        return (
            <div>
                <Header />
                <OpcionesLocales opciones={opciones}/>
                <Container className="containerGeneral">
                    <h2>VENTA</h2>
                </Container>
                <Container fluid={true} className="container-fluid">
                    <Carousel interval={0} wrap={false} indicators={false}>
                        <Carousel.Item>
                        <Container>
                            <Container className="containerGeneral">
                                <h4>Información del Cliente</h4>
                            </Container>
                            <Container className="container-info">
                                <Container>
                                    <Row>
                                        <Col md={3}></Col>
                                        <Col md={3}>
                                            <Form.Group controlId="formGroupNombre">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control type="text" placeholder="Nombre" className="ventas" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={1}></Col>
                                        <Col md={3}>
                                            <Form.Group controlId="formGroupApellido">
                                                <Form.Label>Apellido</Form.Label>
                                                <Form.Control type="text" placeholder="Apellido" className="ventas"/>
                                            </Form.Group>
                                        </Col>
                                        <Col md={2}></Col>
                                    </Row>
                                </Container>

                                <Container>
                                    <Row>
                                        <Col md={3}></Col>
                                        <Col md={3}>
                                            <Form.Group controlId="formGroupEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" placeholder="Email" className="ventas" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={1}></Col>
                                        <Col md={3}>
                                            <Form.Group controlId="formGroupFnac">
                                                <Form.Label>Fecha de Nacimiento</Form.Label>
                                                <Form.Control type="text" placeholder="Fecha de Nacimiento" className="ventas"/>
                                            </Form.Group>
                                        </Col>
                                        <Col md={2}></Col>
                                    </Row>
                                </Container>
                                
                                <Container>
                                    <Row>
                                        <Col md={3}></Col>
                                        <Col md={3}>
                                            <Form.Group controlId="formGroupCedula">
                                                <Form.Label>Cédula</Form.Label>
                                                <Form.Control type="text" placeholder="Cédula" className="ventas" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={1}></Col>
                                        <Col md={3}>
                                            <Form.Group controlId="formGroupEstado">
                                                <Form.Label>Estado</Form.Label>
                                                <Form.Control as="select" className="ventas">
                                                    <option>Amazonas</option>
                                                    <option>Trujillo</option>
                                                    <option>Apure</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md={2}></Col>
                                    </Row>
                                </Container>
                                <Container>
                                    <Row>
                                        <Col md={3}></Col>
                                        <Col md={3}>
                                            <Form.Group controlId="formGroupCiudad">
                                                <Form.Label>Ciudad</Form.Label>
                                                <Form.Control placeholder="Ciudad" as="select" className="ventas" disabled={true}>
                                                    <option>Amazonas</option>
                                                    <option>Trujillo</option>
                                                    <option>Apure</option>
                                                    <option>Bolívar</option>
                                                    <option>Delta Amacuro</option>
                                                    <option>Portuguesa</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md={1}></Col>
                                        <Col md={3}>
                                            <Form.Group controlId="formGroupMunicipio">
                                                <Form.Label>Municipio</Form.Label>
                                                <Form.Control placeholder="Municipio" as="select" className="ventas" disabled={true}>
                                                    <option>Amazonas</option>
                                                    <option>Trujillo</option>
                                                    <option>Apure</option>
                                                    <option>Bolívar</option>
                                                    <option>Delta Amacuro</option>
                                                    <option>Portuguesa</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md={2}></Col>
                                    </Row>
                                </Container>
                            </Container>
                        </Container>
                        </Carousel.Item>
                        <Carousel.Item>
                        <Container>
                            <Container className="containerGeneral">
                                <h4>Información del Producto</h4>
                            </Container>
                            <Container className="container-info">
                                <Container className="container-min">
                                    <Form.Group controlId="formGridState">
                                        <h5>Mineral</h5>
                                        <Container className="container-dropdown">
                                            <Form.Control as="select" className="ventas">
                                                <option>Carbón</option>
                                                <option>Oro</option>
                                            </Form.Control>
                                        </Container>
                                    </Form.Group>
                                </Container>
                                <Container fluid={true} className="container-fluid containerDetalle container-min">
                                    <h5>Cantidad</h5>
                                    <Container className="container-min">
                                        <InputGroup className="mb-3">
                                            <FormControl
                                            placeholder="Cantidad"
                                            aria-label="Amount (to the nearest dollar)"
                                            className="ventas"
                                            />
                                            <InputGroup.Append>
                                                <InputGroup.Text>kg</InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Container>
                                </Container>
                            </Container>
                        </Container>
                        </Carousel.Item>
                        <Carousel.Item>
                            

                        </Carousel.Item>
                    </Carousel>
                </Container>
            </div>
        )
    }
}