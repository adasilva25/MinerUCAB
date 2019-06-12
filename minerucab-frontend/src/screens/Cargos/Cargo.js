import React from 'react';
import MenuBar from '../../components/MenuBar';
import DataTable from '../../components/DataTable';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import ModalYesNo from '../../components/ModalYesNo';

export default class Cargo extends React.Component {
    state = { 
        modalShow: false
    };
    modalClose = () => this.setState({ modalShow: false });
    modalOpen = () => {
        console.log('entro')
        this.setState({ modalShow: true })
    };
    render(){
        return (
            <div className="pagecontent">
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales />
                <ModalYesNo
                    show={this.state.modalShow}
                    onHide={this.modalClose}
                    mensaje={'Existen empleados asociados al cargo Dibujante, reasigne los empleados a otro cargo para poder continuar'}
                />
                <Container className="pagecontent">
                    <Row>
                        <Col md={2}></Col>
                        <Col md={10}>
                            <Row>
                                <Col md={11}>
                                    <h4 className="horizontal-line-title-ventas-form cliente-title">Cargos</h4>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={0} md={1}></Col>
                        <Col sm={12} md={10}>
                            <DataTable
                                columns={'http://localhost:3000/column_names/cargo'} 
                                data={'http://localhost:3000/getAllCargos'}
                                modificar={true}
                                consultar={true}
                                eliminar={true}
                                urlCrear={'/registrar_cargo'}
                                urlModificar={'/gestionar_cargos'}
                                urlConsultar={'/gestionar_cargos'}
                                urlEliminar={'/gestionar_cargos'}
                                textoSingular={'cargo'}
                                textoPlural={'cargos'}
                                modal={this.modalOpen}
                            />
                        </Col>
                        <Col sm={0} md={1}></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}