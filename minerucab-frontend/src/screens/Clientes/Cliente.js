import React from 'react';
import DataTable from '../../components/DataTable';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalRegistrarCliente from '../../components/ModalRegistrarCliente';
import ModalYesNo from '../../components/ModalYesNo';
import axios from 'axios';

export default class Cliente extends React.Component {
    state = { 
        modalShowEliminar: false,
        modalShowCrearCliente: false,
        infoEliminar: '',
        idEliminar: 0,
        urlEliminar: '',
        reload: false
    };
    modalEliminarClienteNaturalOpen = () => {
        this.setState({ modalShowEliminarClienteNatural: false, reload: true });
    }
    modalEliminarClienteNaturalOpen = (i) => {
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }
        
        axios.get(`http://localhost:3000/getClienteNombreApellidoById/${i}`, config)
            .then((res) => {
                this.setState({ infoEliminar: `${res.data[0].p_nombre} ${res.data[0].p_apellido}` })
                this.setState(
                    { 
                        modalShowEliminarClienteNatural: true, 
                        idEliminar: i
                    }
                )
            })
            .catch((e) => {
                console.log('Error con el nombre - apellido por el id cliente');
            })
    };
    modalEliminarClose = () => {
        this.setState({ modalShowEliminar: false, reload: true });
    }
    modalEliminarOpen = (boton) => {
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }
        
        if (boton.className.baseVal.includes('clientesjurídicos')){
            console.log('juridico', boton.className.baseVal)
            console.log(boton.id)
            this.setState({ urlEliminar: `http://localhost:3000/deleteClienteJuridicoById/${boton.id}` });

            axios.get(`http://localhost:3000/getClienteNombreById/${boton.id}`, config)
                .then((res) => {
                    console.log("res", res)
                    this.setState({ infoEliminar: `${res.data[0].nombre}` })
                    this.setState(
                        { 
                            modalShowEliminar: true
                        }
                    )
                    console.log("juridico", boton.id)
                })
                .catch((e) => {
                    console.log('Error con el nombre por el id mineral no metalico');
                })
        }
        else if(boton.className.baseVal.includes('clientesnaturales')){
            console.log('natural')
            this.setState({ urlEliminar: `http://localhost:3000/deleteClienteById/${boton.id}` });
            
            axios.get(`http://localhost:3000/getClienteNombreApellidoById/${boton.id}`, config)
                .then((res) => {
                    this.setState({ infoEliminar: `${res.data[0].p_nombre + ' ' + res.data[0].p_apellido} ` })
                    this.setState(
                        { 
                            modalShowEliminar: true
                        }
                    )
                    console.log("natural", boton.id)
                })
                .catch((e) => {
                    console.log('Error con el nombre por el id mineral metalico');
                })
        }
    };
    modalCrearClienteClose = () => this.setState({ modalShowCrearCliente: false });
    modalCrearClienteOpen = () => {
        this.setState({ modalShowCrearCliente: true })
    }
    selectCheck = (i) => {
        console.log('entro', i);
    }
    render(){
        return (
            <div>
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario={'Andrea Da Silva'}/>
                <ModalRegistrarCliente
                    show={this.state.modalShowCrearCliente}
                    onHide={this.modalCrearClienteClose}
                    mensaje={'Existen empleados asociados al cargo Dibujante, reasigne los empleados a otro cargo para poder continuar'}
                />
                <ModalYesNo
                    show={this.state.modalShowEliminar}
                    onHide={this.modalEliminarClose}
                    mensaje={'¿Está seguro que desea eliminar el cliente'}
                    infoeliminar={this.state.infoEliminar}
                    urleliminar={this.state.urlEliminar}
                    urlOrigen={'/cliente'}
                />
                <Container className="pagecontent ">
                    <div className="pagecontent">
                        <Container>
                            <Row>
                                <Col md={1}></Col>
                                <Col md={11}>
                                    <Row>
                                        <Col md={11}>
                                            <h4 className="horizontal-line-title-ventas-form cliente-title">Clientes</h4>
                                        </Col>
                                        <Col md={1}></Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                            <Row>
                                <Col md={1}></Col>
                                <Col md={10}>
                                    <Row>
                                        <Col md={12}>
                                            <h6 className="horizontal-line-title-ventas-form cliente-title">Clientes Naturales</h6>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Container>
                            <Container className="div-content-form-end-clientes-naturales">
                                <Row>
                                    <Col sm={0} md={1}></Col>
                                    <Col sm={12} md={10}>
                                        <DataTable 
                                            data={'http://localhost:3000/getAllClientes'}
                                            urlModificar={'/registrar_cliente_natural'}
                                            urlConsultar={'/registrar_cliente_natural'}
                                            urlEliminar={'/home'}
                                            agregar={false}
                                            modificar={true}
                                            consultar={true}
                                            eliminar={true}
                                            modalEliminar={this.modalEliminarOpen}
                                            modalCrear={this.modalCrearClienteOpen}
                                            reload={this.state.reload}
                                            checktable={false}
                                            textoSingular={'cliente'}
                                            textoPlural={'clientes naturales'}
                                            size={270}
                                        />
                                    </Col>
                                    <Col sm={0} md={1}></Col>
                                </Row>
                            </Container>
                            <Container>
                                <Row>
                                    <Col md={1}></Col>
                                    <Col md={10}>
                                        <Row>
                                            <Col md={12}>
                                                <h6 className="horizontal-line-title-ventas-form cliente-title">Clientes Jurídicos</h6>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={1}></Col>
                                </Row>
                            </Container>
                            <Container className="div-content-form-end-clientes">
                                <Row>
                                    <Col sm={0} md={1}></Col>
                                    <Col sm={12} md={10}>
                                        <DataTable 
                                            data={'http://localhost:3000/getAllClientesJuridicos'}
                                            urlModificar={'/registrar_cliente_juridico'}
                                            urlConsultar={'/registrar_cliente_juridico'}
                                            urlEliminar={'/home'}
                                            agregar={true}
                                            modificar={true}
                                            consultar={true}
                                            eliminar={true}
                                            modalEliminar={this.modalEliminarOpen}
                                            modalCrear={this.modalCrearClienteOpen}
                                            reload={this.state.reload}
                                            checktable={false}
                                            textoSingular={'cliente'}
                                            textoPlural={'clientes jurídicos'}
                                            size={270}
                                            selectCheck={this.selectCheck}
                                        />
                                    </Col>
                                    <Col sm={0} md={1}></Col>
                                </Row>
                            </Container>
                        </div>
                    </Container>
                </div>
        )
    }
}