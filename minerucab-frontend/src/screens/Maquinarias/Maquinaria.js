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

export default class Maquinaria extends React.Component {
    state = { 
        modalShowEliminar: false,
        infoEliminar: '',
        idEliminar: 0,
        reload: false
    };
    modalEliminarClose = () => {
        this.setState({ modalShowEliminar: false, reload: true });
    }
    modalEliminarOpen = (i) => {
        console.log(i)
        
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }
        
        axios.get(`http://localhost:3000/getMaquinariaById/${i}`, config)
            .then((res) => {
                this.setState({ infoEliminar: `${res.data[0].identificador}` })
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
    render(){
        return (
            <div className="contain pagecontent" id="Content">
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario={'Andrea Da Silva'}/>
                <ModalYesNo
                    show={this.state.modalShowEliminar}
                    onHide={this.modalEliminarClose}
                    mensaje={'¿Está seguro que desea eliminar la maquinaria'}
                    infoeliminar={this.state.infoEliminar}
                    urleliminar={`http://localhost:3000/deleteClienteById/${this.state.idEliminar}`}
                    urlOrigen={'/maquinaria'}
                />
                <Container className="pagecontent">
                    <div className="pagecontent">
                        <Container>
                            <Row>
                                <Col md={1}></Col>
                                <Col md={11}>
                                    <Row>
                                        <Col md={11}>
                                            <h4 className="horizontal-line-title-ventas-form cliente-title">Maquinarias</h4>
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
                                            data={'http://localhost:3000/getAllMaquinarias'}
                                            urlModificar={'/gestionar_maquinaria'}
                                            urlConsultar={'/gestionar_maquinaria'}
                                            urlCrear={'/gestionar_maquinaria/CR'}
                                            agregar={true}
                                            modificar={true}
                                            consultar={true}
                                            eliminar={true}
                                            modalEliminar={this.modalEliminarOpen}
                                            reload={this.state.reload}
                                            checktable={false}
                                            textoSingular={'maquinaria'}
                                            textoPlural={'maquinarias'}
                                            size={270}
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