import React from 'react';
import DataTable from '../../components/DataTable';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

export default class Cliente extends React.Component {
    state = { 
    };
    render(){
        return (
            <div>
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario='Alba Sánchez'/>
                <Container className="pagecontent">
                    <div className="pagecontent">
                        <Container>
                            <Row>
                                <Col md={1}></Col>
                                <Col md={11}>
                                    <Row>
                                        <Col md={11}>
                                            <h4 className="horizontal-line-title-ventas-form cliente-title">Movimientos de inventario</h4>
                                        </Col>
                                        <Col md={1}></Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                            <Container>
                                <Row>
                                    <Col sm={0} md={1}></Col>
                                    <Col sm={12} md={10}>
                                        <DataTable
                                            columns={'http://localhost:3000/column_names/mu_inventario'} 
                                            data={'http://localhost:3000/getInventario'}
                                            agregar={false}
                                            modificar={false}
                                            consultar={false}
                                            eliminar={false}
                                            checktable={false}
                                            textoSingular={'en inventario'}
                                            textoPlural={''}
                                            size={500}
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