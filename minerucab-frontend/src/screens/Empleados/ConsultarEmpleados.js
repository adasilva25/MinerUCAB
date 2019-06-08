import React from 'react';
import MenuBar from '../../components/MenuBar';
import DataTable from '../../components/DataTable';
import {Header} from '../../components/Header';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class ConsultarEmpleados extends React.Component {
    render(){
        return (
            <div>
                <Header />
                    <MenuBar agregar={"/agregar_empleados"}/>
                    <Container>
                        <Row>
                            <Col sm={0} md={1}></Col>
                            <Col sm={12} md={10}>
                                <DataTable
                                    columns={'http://localhost:3000/column_names/test_table'} 
                                    data={'http://localhost:3000/users'}
                                    url={'consultar_empleado/:'}
                                />
                            </Col>
                            <Col sm={0} md={1}>      
                                <div class="addbtn">
                                    <a href="agregar_empleados"><i class="fas fa-plus-circle iconadd"></i></a>
                                </div>
                            </Col>
                        </Row>
                    </Container>
            </div>
        )
    }
}