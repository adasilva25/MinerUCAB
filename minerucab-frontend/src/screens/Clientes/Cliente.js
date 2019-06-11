import React from 'react';
import MenuBar from '../../components/MenuBar';
import DataTable from '../../components/DataTable';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Cliente extends React.Component {
    render(){
        return (
            <div>
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales />
                <div className="pagecontent">
                <Container>
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
                    </Container>
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
                                    eliminar={false}
                                />
                            </Col>
                            <Col sm={0} md={1}></Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}