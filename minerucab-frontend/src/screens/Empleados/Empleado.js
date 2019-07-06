import React from 'react';
import DataTable from '../../components/DataTable';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalYesNo from '../../components/ModalYesNo';
import axios from 'axios';

export default class Cliente extends React.Component {
    state = { 
        modalShowEliminar: false,
        infoEliminar: '',
        idEliminar: 0,
        reload: false,
        c: false,
        r: false,
        u: false,
        d: false
    };
    componentWillMount = () => {
        const userInfoString = localStorage.getItem('user')
        const userInfo = JSON.parse(userInfoString);
        console.log(userInfo)

        userInfo.forEach((info) => {
            if (info.nombre.toLowerCase().includes('empleado')){
                if (info.tipo_privilegio === 'C') {
                    this.setState({ c: true });
                }
                if (info.tipo_privilegio === 'R') {
                    this.setState({ r: true });
                }
                if (info.tipo_privilegio === 'U') {
                    this.setState({ u: true });
                }
                if (info.tipo_privilegio === 'D') {
                    this.setState({ d: true });
                }
            }
        })
        console.log('state', this.state)
    }
    modalEliminarClose = () => {
        this.setState({ modalShowEliminar: false, reload: true });
    }
    modalEliminarOpen = (i) => {
        //console.log(i)
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }
        axios.get(`http://localhost:3000/getEmpleadoById/${i}`, config)
            .then((res) => {
                this.setState({ infoEliminar: `${res.data[0].p_nombre} ${res.data[0].p_apellido}` })
                this.setState
                this.setState(
                    { 
                        modalShowEliminar: true, 
                        idEliminar: i
                    }
                )
            })
            .catch((e) => {
                console.log('Error con el nombre - apellido por el id empleado');
            })
    };
    render(){
        return (
            <div>
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario='Alba Sánchez'/>
                <ModalYesNo
                    show={this.state.modalShowEliminar}
                    onHide={this.modalEliminarClose}
                    mensaje={'¿Está seguro que desea eliminar el empleado'}
                    infoeliminar={this.state.infoEliminar}
                    urleliminar={`http://localhost:3000/deleteEmpleadoById/${this.state.idEliminar}`}
                />
                <Container className="pagecontent">
                    <div className="pagecontent">
                        <Container>
                            <Row>
                                <Col md={1}></Col>
                                <Col md={11}>
                                    <Row>
                                        <Col md={11}>
                                            <h4 className="horizontal-line-title-ventas-form cliente-title">Empleados</h4>
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
                                            columns={'http://localhost:3000/column_names/mu_empleado'} 
                                            data={'http://localhost:3000/getCriticInfoEmpleados'}
                                            urlCrear={'/gestionar_empleado/CR'}
                                            urlModificar={'/gestionar_empleado'}
                                            urlConsultar={'/gestionar_empleado'}
                                            agregar={this.state.c}
                                            modificar={this.state.u}
                                            consultar={this.state.r}
                                            eliminar={this.state.d}
                                            modalEliminar={this.modalEliminarOpen}
                                            reload={this.state.reload}
                                            checktable={false}
                                            textoSingular={'empleado'}
                                            textoPlural={'empleados'}
                                            size={500}
                                            //selectCheck={this.selectCheck}
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