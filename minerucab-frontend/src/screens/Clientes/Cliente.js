import React from 'react';
import DataTable from '../../components/DataTable';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalRegistrarCliente from '../../components/ModalRegistrarCliente';

export default class Cliente extends React.Component {
    state = { 
        modalShowEliminar: false,
        modalShowCrearCliente: false
    };
    modalClose = () => this.setState({ modalShow: false });
    modalOpen = () => {
        console.log('entro')
        this.setState({ modalShow: true })
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
                                    columns={'http://localhost:3000/column_names/test_table'} 
                                    data={'http://localhost:3000/users'}
                                    urlModificar={'/agregar_empleado'}
                                    urlConsultar={'/consultar_empleado'}
                                    urlEliminar={'/home'}
                                    modificar={true}
                                    consultar={true}
                                    eliminar={true}
                                    textoSingular={'empleado'}
                                    textoPlural={'empleados'}
                                    modal={this.modalOpen}
                                    modalCrear={this.modalCrearClienteOpen}
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