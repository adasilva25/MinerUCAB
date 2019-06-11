import React from 'react';
// https://react-bootstrap.github.io/components/buttons/
import {history} from '../../routers/History';
import SetActividades from '../../components/SetActividades'
import OpcionesLocales from '../../components/OpcionesLocales'
import OpcionesGlobales from '../../components/OpcionesGlobales'
import DataTable from '../../components/DataTable';
import FormTitulo from '../../components/FormTitulo'
import FormLugar from '../../components/FormLugar'
import FormFecha from '../../components/FormFecha'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

export default class RegistrarYacimiento extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            etapas: [{
                nombre: "Etapa 1",
                numero: 1,
                key:0,
                fases: [{
                    nombre: "Fase 1",
                    numero:1
                }]
            }]
        }
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    onClickDashboardPage(){
        history.push('/dashboard');  
    }       

    onClickLoginPage(){
        history.push('/');  
    }  
    
    handleOnSelect(key){
        var etapa= this.state.etapas;
        etapa[0].key=key;
        this.setState({etapas:etapa});
    }

    handleOnClick(){
        var etapa= this.state.etapas;
        var Etapa={
                nombre: '',
                numero: 0,
                 key:1,
                fases: [{
                    nombre: '',
                    numero:0
                }]
            }
        Etapa.numero=etapa[etapa.length-1].numero+1;
        Etapa.nombre= 'Etapa '+ Etapa.numero;    
        this.setState((prevState) => ({
            etapas: prevState.etapas.concat(Etapa)
        }));
    }

    render(){
        
       
        return ( 
            <div className="contain pagecontent" id="Content">
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario="Diego Gutiérrez"/>
                <Container className="FormContainer">
                    <FormTitulo titulo="Registrar Yacimiento" tamaño="BIG"/>
                    <FormTitulo titulo="Información General"/>
                    <Form.Row className="formMargins">
                        <Form.Group as={Col} md="6" controlId="formBasicEmail" className="inputsPaddingRight">
                            <Form.Label className="cliente-description-fields-text">Nombre</Form.Label>
                            <Form.Control type="text" className="form-input" placeholder="Introduzca nombre del yacimiento" />
                            <Form.Text className="text-muted">
                                Obligatorio
                            </Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="exampleForm.ControlTextarea1" className="inputsPaddingLeft">
                            <Form.Label className="cliente-description-fields-text">Descripción</Form.Label>
                            <Form.Control as="textarea" rows="1" className="form-input-juridico-textarea" placeholder="Introduzca una descripción"/>
                            <Form.Text className="text-muted">
                                Obligatorio
                            </Form.Text>
                        </Form.Group>   
                    </Form.Row>
                    <Form.Row className="formMargins">
                        <Form.Group as={Col} md="6" controlId="formBasicEmail"  className="inputsPaddingRight">
                            <Form.Label className="cliente-description-fields-text">Área</Form.Label>
                            <InputGroup className="MyInputGroup">
                                <Form.Control type="text" className="form-input" placeholder="Introduzca tamaño del yacimiento" /> 
                                <InputGroup.Append>
                                    <InputGroup.Text  className="input-append-ventas-form" >Km<sup>2</sup></InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                            <Form.Text className="text-muted">
                                Obligatorio
                            </Form.Text>    
                        </Form.Group>
                        <FormFecha titulo="Fecha de Registro" clase="inputsPaddingLeft"/>    
                    </Form.Row>
                    <FormLugar/>
                    <FormTitulo titulo="Minerales"/>
                    <Row>
                        <Col sm={0} md={1}></Col>
                        <Col sm={12} md={10}>
                            <DataTable
                                columns={'http://localhost:3000/column_names/test_table'} 
                                data={'http://localhost:3000/users'}
                                url={'consultar_empleado/:'}
                            />
                        </Col>
                        <Col sm={0} md={1}></Col>
                    </Row>
                    <Container>
                        <FormTitulo titulo="Carbón"/>
                        <Form.Row className="formMargins">
                            <Form.Group as={Col} md="3" controlId="formBasicEmail"  className="inputsPaddingRight">
                                <Form.Label className="cliente-description-fields-text">Clarita</Form.Label>
                                <InputGroup className="MyInputGroup">
                                    <Form.Control type="text" className="form-input" placeholder="Introduzca cantidad" /> 
                                    <InputGroup.Append>
                                        <InputGroup.Text  className="input-append-ventas-form" >Kg</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                                <Form.Text className="text-muted">
                                    Obligatorio
                                </Form.Text>    
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="formBasicEmail"  className="inputsPaddingRight">
                                <Form.Label className="cliente-description-fields-text">Durita</Form.Label>
                                <InputGroup className="MyInputGroup">
                                    <Form.Control type="text" className="form-input" placeholder="Introduzca cantidad" /> 
                                    <InputGroup.Append>
                                        <InputGroup.Text  className="input-append-ventas-form" >Kg</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                                <Form.Text className="text-muted">
                                    Obligatorio
                                </Form.Text>    
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="formBasicEmail"  className="inputsPaddingRight">
                                <Form.Label className="cliente-description-fields-text">Fusita</Form.Label>
                                <InputGroup className="MyInputGroup">
                                    <Form.Control type="text" className="form-input" placeholder="Introduzca cantidad" /> 
                                    <InputGroup.Append>
                                        <InputGroup.Text  className="input-append-ventas-form" >Kg</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                                <Form.Text className="text-muted">
                                    Obligatorio
                                </Form.Text>    
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="formBasicEmail"  className="inputsPaddingRight">
                                <Form.Label className="cliente-description-fields-text">Virita</Form.Label>
                                <InputGroup className="MyInputGroup">
                                    <Form.Control type="text" className="form-input" placeholder="Introduzca cantidad" /> 
                                    <InputGroup.Append>
                                        <InputGroup.Text  className="input-append-ventas-form" >Kg</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                                <Form.Text className="text-muted">
                                    Obligatorio
                                </Form.Text>    
                            </Form.Group>
                        </Form.Row>
                        <Form.Row className="formMargins">
                            <Form.Group as={Col} md="12" controlId="formBasicEmail"  className="inputsPaddingRight">
                                <Form.Label className="cliente-description-fields-text">Total</Form.Label>
                                <InputGroup className="MyInputGroup">
                                    <Form.Control type="text" className="form-input" placeholder="Introduzca cantidad" /> 
                                    <InputGroup.Append>
                                        <InputGroup.Text  className="input-append-ventas-form" >Kg</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                                <Form.Text className="text-muted">
                                    Obligatorio
                                </Form.Text>    
                            </Form.Group>
                        </Form.Row>
                    </Container>
                    <FormTitulo titulo="Etapas"/>
                    <Button className="ventas-form-btn btn-block" onClick={this.handleOnClick} >
                        Agregar
                    </Button>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={this.state.etapas[0].key}
                        onSelect={key => this.handleOnSelect(key)}
                    >
                        {this.state.etapas.map((etapa,index)=>{
                            return(
                                <Tab eventKey={etapa.nombre} title={etapa.nombre}>
                                    {etapa.numero}
                                </Tab>
                            );
                        })}
                    </Tabs>
                </Container>
            </div>
        ) 
    }

}
