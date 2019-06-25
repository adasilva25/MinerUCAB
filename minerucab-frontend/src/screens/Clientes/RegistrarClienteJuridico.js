import React from 'react';
import Button from 'react-bootstrap/Button';
// https://react-bootstrap.github.io/components/buttons/
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import axios from 'axios';
// https://www.wlaurance.com/2018/09/node-postgres-insert-multiple-rows/
// https://node-postgres.com/features/queries

export default class RegistrarClienteJuridico extends React.Component { 
    state = {
        nombre: '',
        rif: '',
        correo: '',
        tlf: '',
        disable: false
    }   
    componentDidMount = () => {
        if (this.props.match.params.accion !== 'CR'){
            if (this.props.match.params.accion === 'CO'){
                this.setState({ disable: true });
            }
            const config = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                responseType: 'json'
            }
            
            axios.get(`http://localhost:3000/getClienteJuridicoById/${this.props.match.params.id}`, config)
                .then((res) => {
                    console.log(res);
                    this.setState({ nombre: res.data[0].nombre });
                    this.setState({ area_trabajo: res.data[0].nombre });
                    this.setState({ rif: res.data[0].rif });
                    this.setState({ correo: res.data[0].email });
                    this.setState({ tlf: res.data[0].telefono });
                }).catch((e) => {
                    console.log('Error en axios')
                })
        }
    }         
    render(){
        let title;

        if (this.props.match.params.accion === 'CO'){
            title = 'Consultar'
        }
        else if(this.props.match.params.accion === 'CR'){
            title = 'Crear'
        }
        else if(this.props.match.params.accion === 'M'){
            title = 'Modificar'
        }

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
                                    <h5 className="horizontal-line-title cliente-title">{title} Cliente Jurídico</h5>
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
                                            <Form.Control 
                                                type="text" 
                                                className="form-input" 
                                                placeholder="Introduzca el nombre de la empresa" 
                                                value={this.state.nombre}
                                            />
                                            {!this.state.disable && <Form.Text className="text-muted"> Obligatorio</Form.Text>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="cliente-description-fields-text">RIF</Form.Label>
                                            <Row className="div-content-date">
                                                <Form.Control as="select" 
                                                    className="form-input form-ci-type" 
                                                    disabled={this.state.disable}>
                                                    <option>J</option>
                                                </Form.Control>   
                                                <Form.Control 
                                                    type="text" 
                                                    className="form-input form-ci-number" 
                                                    placeholder="Introduzca el RIF de la empresa"
                                                    disabled={this.state.disable}
                                                    value={this.state.rif}
                                                />                                       
                                            </Row>  
                                            {!this.state.disable && <Form.Text className="text-muted"> Obligatorio</Form.Text>}
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
                                            <Form.Control 
                                                type="email" 
                                                className="form-input" 
                                                placeholder="Introduzca su correo electrónico"
                                                value={this.state.correo} 
                                                disabled={this.state.disable}
                                            />
                                            {!this.state.disable && <Form.Text className="text-muted"> Obligatorio</Form.Text>}
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}> 
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="cliente-description-fields-text">Número Telefónico</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                className="form-input" 
                                                placeholder="Introduzca un teléfono de contacto" 
                                                value={this.state.tlf} 
                                                disabled={this.state.disable}
                                            />
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
                                                    disabled={this.state.disable}
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
                                                    disabled={this.state.disable}
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
                                                    disabled={this.state.disable}
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