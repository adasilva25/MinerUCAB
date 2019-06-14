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
        reload: false
    };
    modalEliminarClose = () => {
        this.setState({ modalShowEliminar: false, reload: true });
    }
    modalEliminarOpen = (i) => {
        // console.log(i)
        
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }
        
        axios.get(`http://localhost:3000/getClienteNombreApellidoById/${i}`, config)
            .then((res) => {
                this.setState({ infoEliminar: `${res.data[0].nombre} ${res.data[0].apellido}` })
                this.setState
                this.setState(
                    { 
                        modalShowEliminar: true, 
                        idEliminar: i
                    }
                )
            })
            .catch((e) => {
                console.log('Error con el nombre - apellido por el id cliente');
            })
    };
    modalCrearClienteClose = () => this.setState({ modalShowCrearCliente: false });
    modalCrearClienteOpen = () => {
        this.setState({ modalShowCrearCliente: true })
    }
    render(){
        return (
            <div>
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales />
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
                    urleliminar={`http://localhost:3000/deleteClienteById/${this.state.idEliminar}`}
                />
                <Container className="pagecontent">
                    <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={11}>
                                    <h4 className="horizontal-line-title-ventas-form cliente-title">Clientes</h4>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Container>
                        <Row>
                            <Col sm={0} md={2}></Col>
                            <Col sm={12} md={9}>
                                <DataTable
                                    columns={'http://localhost:3000/column_names/cliente'} 
                                    data={'http://localhost:3000/getAllClientes'}
                                    urlModificar={'/agregar_empleado'}
                                    urlConsultar={'/consultar_empleado'}
                                    urlEliminar={'/home'}
                                    modificar={true}
                                    consultar={true}
                                    eliminar={true}
                                    textoSingular={'empleado'}
                                    textoPlural={'empleados'}
                                    modalEliminar={this.modalEliminarOpen}
                                    modalCrear={this.modalCrearClienteOpen}
                                    reload={this.state.reload}
                                />
                            </Col>
                            <Col sm={0} md={1}></Col>
                        </Row>
                    </Container>
                </Container>
            </div>
        )
    }
}