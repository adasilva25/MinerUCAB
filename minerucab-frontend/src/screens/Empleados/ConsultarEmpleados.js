import React from 'react';
import MenuBar from '../../components/MenuBar';
import DataTable from '../../components/DataTable';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class ConsultarEmpleados extends React.Component {
    render(){
        return (
            <div>
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales />
                <div className="pagecontent">
                    <Container>
                        <h3>Consultar Empleados</h3>
                        {this.props.match.params.userId}
                        <Row>
                            <Col sm={12} md={12}>
                                <DataTable
                                    columns={'http://localhost:3000/column_names/test_table'} 
                                    data={'http://localhost:3000/users'}
                                    url={'consultar_empleado/:'}
                                />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}