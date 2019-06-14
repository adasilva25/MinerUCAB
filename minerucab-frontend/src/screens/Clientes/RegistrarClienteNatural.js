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


export default class RegistrarClienteNatural extends React.Component {             
    state = {
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        dia: undefined,
        mes: undefined,
        ano: undefined,
        tlf: undefined
    }
    onSubmit = () => {

    }
    onChangeText = (e) => {
        const text = e.target.value;
        
        if (!text || text.match(/^[A-Za-z]+$/)) {
            if (e.target.id === 'primerNombre'){
                this.setState({ primerNombre: e.target.value });
            }
            if (e.target.id === 'segundoNombre'){
                this.setState({ segundoNombre: e.target.value });
            }
            if (e.target.id === 'primerApellido'){
                this.setState({ primerApellido: e.target.value });
            }
            if (e.target.id === 'segundoApellido'){
                this.setState({ segundoApellido: e.target.value });
            }
        }
    }
    onChangeNumber = (e) => {
        const number = e.target.value;

        if ((!number) || number.match(/^\d*$/)){
            console.log('e')
            if (e.target.id === 'dia-cliente'){
                this.setState({ dia: e.target.value });
            }
        }
    }
    render(){
        return (
            <div className="contain pagecontent">
                <OpcionesLocales />
                <Container>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={9}>
                            <Row>
                                <Col md={11}>
                                    <h5 className="horizontal-line-title cliente-title">Registrar Cliente Natural</h5>
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
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Información Personal</h6>
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
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Primer Nombre</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                className="form-input" 
                                                id="primerNombre"
                                                value={this.state.primerNombre} 
                                                placeholder="Introduzca su primer nombre"
                                                autoFocus
                                                onChange={this.onChangeText} 
                                            />
                                            <Form.Text className="text-muted">
                                                Este campo es obligatorio
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="cliente-description-fields-text">Segundo Nombre</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                className="form-input" 
                                                value={this.state.segundoNombre} 
                                                onChange={this.onChangeText} 
                                                placeholder="Introduzca su segundo nombre" 
                                            />
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
                                            <Form.Label className="cliente-description-fields-text">Primer Apellido</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                className="form-input" 
                                                value={this.state.primerApellido} 
                                                placeholder="Introduzca su primer apellido" 
                                                onChange={this.onChangeText} 
                                            />
                                        </Form.Group>
                                        <Form.Text className="text-muted">
                                            Este campo es obligatorio
                                        </Form.Text> 
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label className="cliente-description-fields-text">Segundo Apellido</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                className="form-input" 
                                                value={this.state.segundoApellido} 
                                                placeholder="Introduzca su segundo apellido" 
                                                onChange={this.onChangeText} 
                                            />
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
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Cédula de Identidad</Form.Label>
                                            <Row className="div-content-date">
                                                <Form.Control as="select" className="form-input form-ci-type">
                                                    <option>V</option>
                                                    <option>E</option>
                                                    <option>J</option>
                                                </Form.Control>   
                                                <Form.Control 
                                                    type="text" 
                                                    className="form-input form-ci-number" 
                                                    placeholder="Introduzca su cédula de identidad"
                                                    
                                                    onChange={this.onChangeNumber}
                                                />                                       
                                            </Row>  
                                            <Form.Text className="text-muted">
                                                Este campo es obligatorio
                                            </Form.Text> 
                                        </Form.Group>   
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Fecha de Nacimiento</Form.Label>
                                                <Row className="div-content-date">
                                                    <Form.Control 
                                                        type="text" 
                                                        id="dia-cliente"
                                                        className="form-date form-input form-input-day" 
                                                        placeholder="DD"
                                                        onChange={this.onChangeNumber} 
                                                        value={this.state.dia}
                                                    />                                                    
                                                        <Form.Text className="text-muted">
                                                            _
                                                        </Form.Text>
                                                    <Form.Control 
                                                        type="text" 
                                                        className="form-date form-input" 
                                                        placeholder="MM" 
                                                        id="mes-cliente"
                                                        onChange={this.onChangeNumber} 
                                                        value={this.state.mes}
                                                    />                                                    
                                                        <Form.Text className="text-muted">
                                                            _
                                                        </Form.Text>
                                                    <Form.Control 
                                                        type="text" 
                                                        id="ano-cliente"
                                                        className="form-date form-input" 
                                                        onChange={this.onChangeNumber} 
                                                        placeholder="YYYY" 
                                                        value={this.state.ano}
                                                    />                                            
                                                </Row>
                                                <Form.Text className="text-muted">
                                                    Este campo es obligatorio
                                                </Form.Text>
                                        </Form.Group>
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
                                            <Form.Control 
                                                type="email" 
                                                className="form-input" 
                                                placeholder="Introduzca su correo electrónico" 
                                            />
                                            <Form.Text className="text-muted">
                                                Este campo es obligatorio
                                            </Form.Text>
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
                                                onChange={this.onChangeNumber}
                                                value={this.state.tlf}
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
                                    <h6 className="horizontal-line-title-ventas-form cliente-title">Dirección</h6>
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
                                            onClick={this.onSubmit}
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