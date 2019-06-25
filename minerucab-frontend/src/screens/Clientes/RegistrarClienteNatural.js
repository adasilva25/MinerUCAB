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
import axios from 'axios';


export default class RegistrarClienteNatural extends React.Component {             
    state = {
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        dia: '',
        mes: '',
        ano: '',
        tlf: '',
        ci: '',
        correo: '',
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
            
            axios.get(`http://localhost:3000/getClienteById/${this.props.match.params.id}`, config)
                .then((res) => {
                    console.log(res);
                    this.setState({ primerNombre: res.data[0].p_nombre });
                    this.setState({ segundoNombre: res.data[0].s_nombre });
                    this.setState({ primerApellido: res.data[0].p_apellido });
                    this.setState({ segundoApellido: res.data[0].s_apellido });
                    this.setState({ ci: res.data[0].ci });
                    this.setState({ correo: res.data[0].email });
                    this.setState({ tlf: res.data[0].telefono });
                    const date = new Date(res.data[0].fecha_nacimiento)
                    const dia = date.getDate()
                    const mes = (date.getMonth() + 1)
                    const ano = date.getFullYear()
                    this.setState({ dia });
                    this.setState({ mes });
                    this.setState({ ano });
                }).catch((e) => {
                    console.log('Error en axios')
                })
        }
    }
    onSubmit = (e) => {
        const info = {
            primerNombre: '',
            segundoNombre: '',
            primerApellido: '',
            segundoApellido: '',
            ci: '',
            fecha: '',
            correo: '',
            tlf: '',
            estado: '',
            municipio: '',
            parroquia: ''
        };

        // info.primerNombre = document.getElementById('primerNombre-cliente-natural').value;
        // info.segundoNombre = document.getElementById('segundoNombre-cliente-natural').value;
        // info.primerApellido = document.getElementById('primerApellido-cliente-natural').value;
        // info.segundoApellido = document.getElementById('segundoApellido-cliente-natural').value;
        // info.ci = document.getElementById('ci-cliente-natural').value;
        // info.fecha = document.getElementById('dia-cliente-natural').value + '-' + document.getElementById('mes-cliente-natural').value + '-' + document.getElementById('ano-cliente-natural').value;
        // info.correo = document.getElementById('correo-cliente-natural').value;
        // info.tlf = document.getElementById('tlf-cliente-natural').value;
        // info.estado = document.getElementById('estado-cliente-natural').value;
        // info.municipio = document.getElementById('municipio-cliente-natural').value;
        // info.parroquia = document.getElementById('parroquia-cliente-natural').value;

        console.log('info', info);

        if ((this.state.primerNombre.length > 0) || (this.state.segundoNombre.length > 0) || 
            (this.state.primerApellido.length > 0) || (this.state.segundoApellido.length > 0) ||
            (this.state.ci.length > 0) || (this.state.dia.length > 0) || (this.state.mes.length > 0) ||
            (this.state.ano.length > 0) || (this.state.correo.length > 0) || (this.state.tlf > 0)){
                
                info.primerNombre = this.state.primerNombre;
                info.segundoNombre = this.state.segundoNombre;
                info.primerApellido = this.state.primerApellido;
                info.segundoApellido = this.state.segundoApellido;
                info.ci = this.state.ci;
                info.fecha = this.state.dia + '-' + this.state.mes + '-' + this.state.ano;
                info.correo = this.state.correo;
                info.tlf = this.state.tlf;
                info.estado = document.getElementById('estado-cliente-natural').value;
                info.municipio = document.getElementById('municipio-cliente-natural').value;
                info.parroquia = document.getElementById('parroquia-cliente-natural').value;

                console.log('info', info);

                // const config = {
                //     headers: {
                //       'Content-Type': 'application/x-www-form-urlencoded'
                //     },
                //     responseType: 'json',
                //     data: info
                // }
                
                // axios.post('http://localhost:3000/createClienteNatural', config)
                //     .then((res) => {
                //         console.log(res)
                //     }).catch((e) => {
                //         console.log('Error en axios')
                //     })
            }
    }
    onChangeText = (e) => {
        const text = e.target.value;
        
        if (!text || text.match(/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/)) {
            if (e.target.id === 'primerNombre-cliente-natural'){
                this.setState({ primerNombre: e.target.value.trim() });
            }
            if (e.target.id === 'segundoNombre-cliente-natural'){
                this.setState({ segundoNombre: e.target.value.trim() });
            }
            if (e.target.id === 'primerApellido-cliente-natural'){
                this.setState({ primerApellido: e.target.value.trim() });
            }
            if (e.target.id === 'segundoApellido-cliente-natural'){
                this.setState({ segundoApellido: e.target.value.trim() });
            }
        }
    }
    onChangeNumber = (e) => {
        const number = e.target.value;

        if ((!number) || number.match(/^[0-9\b]+$/)){
            console.log('number', number)
            if (e.target.id === 'dia-cliente-natural'){
                this.setState({ dia: e.target.value });
            }
            else if (e.target.id === 'mes-cliente-natural'){
                this.setState({ mes: e.target.value });
            }
            else if (e.target.id === 'ano-cliente-natural'){
                this.setState({ ano: e.target.value });
            }
            else if (e.target.id === 'ci-cliente-natural'){
                this.setState({ ci: e.target.value });
            }
            else {
                this.setState({ tlf: e.target.value });
            }
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
                <OpcionesLocales Usuario='Andrea Da Silva'/>
                <Container>
                    <Row>
                        <Col md={2}></Col>
                        <Col md={9}>
                            <Row>
                                <Col md={11}>
                                    <h5 className="horizontal-line-title cliente-title">{title} Cliente Natural</h5>
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
                                                id="primerNombre-cliente-natural"
                                                value={this.state.primerNombre} 
                                                placeholder="Introduzca su primer nombre"
                                                autoFocus={!this.state.disable}
                                                disabled={this.state.disable}
                                                onChange={this.onChangeText} 
                                            />
                                            <Form.Text className="text-muted">
                                                Este campo es obligatorio
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group >
                                            <Form.Label className="cliente-description-fields-text">Segundo Nombre</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                id="segundoNombre-cliente-natural"
                                                className="form-input" 
                                                value={this.state.segundoNombre} 
                                                onChange={this.onChangeText} 
                                                disabled={this.state.disable}
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
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Primer Apellido</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                id="primerApellido-cliente-natural"
                                                className="form-input" 
                                                value={this.state.primerApellido} 
                                                placeholder="Introduzca su primer apellido" 
                                                onChange={this.onChangeText} 
                                                disabled={this.state.disable}
                                            />
                                        </Form.Group>
                                        <Form.Text className="text-muted">
                                            Este campo es obligatorio
                                        </Form.Text> 
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Segundo Apellido</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                id="segundoApellido-cliente-natural"
                                                className="form-input" 
                                                value={this.state.segundoApellido} 
                                                placeholder="Introduzca su segundo apellido" 
                                                onChange={this.onChangeText} 
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
                    <div>
                        <Row className="div-content-form">
                            <Col md={2}></Col>
                            <Col md={9}>
                                <Form.Row>
                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label className="cliente-description-fields-text">Cédula de Identidad</Form.Label>
                                            <Row className="div-content-date">
                                                <Form.Control as="select" className="form-input form-ci-type" disabled={this.state.disable}>
                                                    <option>V</option>
                                                    <option>E</option>
                                                    <option>J</option>
                                                </Form.Control>   
                                                <Form.Control 
                                                    type="text" 
                                                    className="form-input form-ci-number" 
                                                    id='ci-cliente-natural'
                                                    placeholder="Introduzca su cédula de identidad"
                                                    value={this.state.ci}
                                                    onChange={this.onChangeNumber}
                                                    disabled={this.state.disable}
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
                                                        id="dia-cliente-natural"
                                                        className="form-date form-input form-input-day" 
                                                        placeholder="DD"
                                                        onChange={this.onChangeNumber} 
                                                        value={this.state.dia}
                                                        disabled={this.state.disable}
                                                    />                                                    
                                                        <Form.Text className="text-muted">
                                                            _
                                                        </Form.Text>
                                                    <Form.Control 
                                                        type="text" 
                                                        className="form-date form-input" 
                                                        placeholder="MM" 
                                                        id="mes-cliente-natural"
                                                        onChange={this.onChangeNumber} 
                                                        value={this.state.mes}
                                                        disabled={this.state.disable}
                                                    />                                                    
                                                        <Form.Text className="text-muted">
                                                            _
                                                        </Form.Text>
                                                    <Form.Control 
                                                        type="text" 
                                                        id="ano-cliente-natural"
                                                        className="form-date form-input" 
                                                        onChange={this.onChangeNumber} 
                                                        placeholder="YYYY" 
                                                        value={this.state.ano}
                                                        disabled={this.state.disable}
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
                                        <Form.Group >
                                            <Form.Label className="cliente-description-fields-text">Correo Electrónico</Form.Label>
                                            <Form.Control 
                                                type="email" 
                                                className="form-input" 
                                                id='correo-cliente-natural'
                                                placeholder="Introduzca su correo electrónico" 
                                                value={this.state.correo}
                                                onChange={this.onChangeText}
                                                disabled={this.state.disable}
                                            />
                                            <Form.Text className="text-muted">
                                                Este campo es obligatorio
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={5}> 
                                        <Form.Group >
                                            <Form.Label className="cliente-description-fields-text">Número Telefónico</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                id='tlf-cliente-natural' 
                                                className="form-input" 
                                                placeholder="Introduzca un teléfono de contacto" 
                                                onChange={this.onChangeNumber}
                                                disabled={this.state.disable}
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
                                            id='estado-cliente-natural'
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
                                            id='municipio-cliente-natural'
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
                                            id='parroquia-cliente-natural'
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