﻿import React from 'react';
import DataTable from '../../components/DataTable';
import DataTableAux from '../../components/DataTable';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalRegistrarMineral from '../../components/ModalRegistrarMineral';
import ModalYesNo from '../../components/ModalYesNo';
import axios from 'axios';

export default class Mineral extends React.Component {
    state = { 
        modalShowCrearMineral: false,
        modalShowEliminar: false,
        infoEliminar: '',
        idEliminar: 0,
        reloadMet: false,
        reloadNoMet: false,
        urlEliminar: ''
    };
    modalEliminarClose = () => {
        this.setState({ modalShowEliminar: false, reloadMet: true });
    }
    modalEliminarOpen = (boton) => {
        // console.log(i)
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }

        if (boton.className.baseVal.includes('mineralesnometalicos')){
            console.log('noMetalico', boton.className.baseVal)
            this.setState({ urlEliminar: `http://localhost:3000/deleteMineralNoMetalicoById/${boton.id}` });
            axios.get(`http://localhost:3000/getNombreMineralNoMetalicoById/${boton.id}`, config)
                .then((res) => {
                    console.log(res)
                    this.setState({ infoEliminar: `${res.data[0].nombre}` })
                    this.setState(
                        { 
                            modalShowEliminar: true
                        }
                    )
                    console.log("id no met", boton.id)
                })
                .catch((e) => {
                    console.log('Error con el nombre por el id mineral no metalico');
                })
        }
        else if(boton.className.baseVal.includes('mineralesmetalicos')){
            console.log('mineralesmetalicos')
            this.setState({ urlEliminar: `http://localhost:3000/deleteMineralMetalicoById/${boton.id}` });
            axios.get(`http://localhost:3000/getNombreMineralMetalicoById/${boton.id}`, config)
                .then((res) => {
                    this.setState({ infoEliminar: `${res.data[0].nombre}` })
                    this.setState(
                        { 
                            modalShowEliminar: true
                        }
                    )
                    console.log("id met", boton.id)
                })
                .catch((e) => {
                    console.log('Error con el nombre por el id mineral metalico');
                })
        }
    }
    modalCrearMineralClose = () =>
        this.setState({ modalShowCrearMineral: false });
    modalCrearMineralOpen = () => {
        this.setState({ modalShowCrearMineral: true })
    }
    render(){
        return (
            <div className="contain pagecontent" id="Content">
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario={'Andrea Da Silva'}/>
                <ModalRegistrarMineral
                    show={this.state.modalShowCrearMineral}
                    onHide={this.modalCrearMineralClose}
                    mensaje={''}
                />
                <ModalYesNo
                    show={this.state.modalShowEliminar}
                    onHide={this.modalEliminarClose}
                    mensaje={'¿Está seguro que desea eliminar el mineral'}
                    infoeliminar={this.state.infoEliminar}
                    urleliminar={this.state.urlEliminar}
                />
                <Container className="pagecontent">
                    <Row>
                        <Col md={1}></Col>
                        <Col md={11}>
                            <Row>
                                <Col md={11}>
                                    <h4 className="horizontal-line-title-ventas-form cliente-title">Minerales</h4>
                                </Col>
                                <Col md={1}></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={0} md={1}></Col>
                        <Col sm={12} md={10}>
                            <Row>
                                <Col md={1}></Col>
                                <Col md={11}>
                                    <Row>
                                        <Col md={11}>
                                            <h4 className="horizontal-line-title-ventas-form cliente-title">Minerales metalicos</h4>
                                        </Col>
                                        <Col md={1}></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <DataTable
                                columns={'http://localhost:3000/column_names/mu_mineral_metalico'} 
                                data={'http://localhost:3000/getAllMineralesMetalicos'}
                                urlModificar={'/mineral_metalico'}
                                urlConsultar={'/mineral_metalico'}
                                agregar={false}
                                modificar={true}
                                consultar={true}
                                eliminar={true}
                                modalEliminar={this.modalEliminarOpen}
                                modalCrear={this.modalCrearMineralOpen}
                                reload={this.state.reloadMet}
                                checktable={false}
                                textoSingular={'mineral'}
                                textoPlural={'minerales metalicos'}
                                size={250}
                            />
                             <Row>
                                <Col md={1}></Col>
                                <Col md={11}>
                                    <Row>
                                        <Col md={11}>
                                            <h4 className="horizontal-line-title-ventas-form cliente-title">Minerales no metalicos</h4>
                                        </Col>
                                        <Col md={1}></Col>
                                    </Row>
                                </Col>
                            </Row>
                            <DataTableAux
                                columns={'http://localhost:3000/column_names/mu_mineral_no_metalico'} 
                                data={'http://localhost:3000/getAllMineralesNoMetalicos'}
                                urlModificar={'/mineral_no_metalico'}
                                urlConsultar={'/mineral_no_metalico'}
                                agregar={true}
                                modificar={true}
                                consultar={true}
                                eliminar={true}
                                modalEliminar={this.modalEliminarOpen}
                                modalCrear={this.modalCrearMineralOpen}
                                reload={this.state.reloadNoMet}
                                checktable={false}
                                textoSingular={'mineral'}
                                textoPlural={'minerales no metalicos'}
                                size={250}
                            />
                        </Col>
                        <Col sm={0} md={1}></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}