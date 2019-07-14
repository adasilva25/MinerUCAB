import React from 'react';
import axios from 'axios';
import ModalFecha from '../../components/ModalFecha';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

export default class Cliente extends React.Component {
    state = { 
        modalFecha: false,
        idReporte: 0,
        reload: false
    };
    modalFechaClose = () => this.setState({ modalFecha: false });
    modalFechaOpen = (i) => {
        this.setState({ idReporte: i, modalFecha: true });
    }
    executeReport = (reportNumber) => {
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }

        if ((reportNumber === 1) || (reportNumber === 8)){
            axios.get(`http://localhost:3000/getReporte${reportNumber}`, config)
            .then((res) => {
                console.log('res', res)
                const link = res.data.link
                window.location.replace(link);
                let myWindow = window.open("", "_blank");
                myWindow.document.write(`<title>Reporte${reportNumber}</title>`);
                myWindow.document.write('<img src="/images/MinerUCAB-logo.png" style="width: 25rem; height: 8%; background-color: #707070; margin-left: 18rem; margin-top: 1.5rem;"/>');
                myWindow.document.write(link);
                myWindow.focus()
            })
            .catch((e) => {
                console.log(`Error con la ejecución del Reporte ${reportNumber}`);
            })
        }
    }   
    render(){
        let data = {
            reporte1: 'Empresa aliada a la que se le realizaron más compras',
            reporte2: 'Fases que presentan retrasos en un período de tiempo',
            reporte3: 'Proyecto más costoso por mes',
            reporte4: 'Top 10 de peores empleados por período de tiempo',
            reporte5: 'Listado de etapas y fases de los proyectos que están pendientes por iniciar en un período de tiempo',
            reporte6: 'Empleados que han participado más de dos veces en proyectos en el mismo mes, en un período de tiempo determinado',
            reporte7: 'Total de proyectos en los que trabajó un empleado por período de tiempo',
            reporte8: 'Presentación del mineral menos solicitada por los clientes por año',
            reporte9: 'Maquinaria menos utilizada en los proyectos por período de tiempo',
            reporte10: 'Movimiento de inventario en un período de tiempo'
        }
        
        return (
            <div>
                <OpcionesGlobales active="Home"/>
                <OpcionesLocales Usuario='Andrea Da Silva'/>
                <Container className="pagecontent">
                <ModalFecha
                    show={this.state.modalFecha}
                    onHide={this.modalFechaClose}
                    idReporte={this.state.idReporte}
                    executeReport={this.executeReport}
                />
                        <Container>
                            <Row>
                                <Col md={1}></Col>
                                <Col md={11}>
                                    <Row>
                                        <Col md={11}>
                                            <h4 className="horizontal-line-title-ventas-form cliente-title">Reportes</h4>
                                        </Col>
                                        <Col md={1}></Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    <Container className="reporte">
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th className="sc-th">Número</th>
                                    <th className="sc-th">Reporte</th>
                                    <th className="sc-th">Ejecutar</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{1}</td>
                                    <td>{data.reporte1}</td>
                                    <td><FontAwesomeIcon onClick={(e) => this.executeReport(1)} className="icons iconreport" icon={Icons.faFile}/></td>
                                </tr>
                                <tr>
                                    <td>{2}</td>
                                    <td>{data.reporte2}</td>
                                    <td><FontAwesomeIcon onClick={(e) => this.modalFechaOpen(2)} className="icons iconreport" icon={Icons.faFile}/></td>
                                </tr>
                                <tr>
                                    <td>{3}</td>
                                    <td>{data.reporte3}</td>
                                    <td><FontAwesomeIcon onClick={(e) => this.modalFechaOpen(3)} className="icons iconreport" icon={Icons.faFile}/></td>
                                </tr>
                                <tr>
                                    <td>{4}</td>
                                    <td>{data.reporte4}</td>
                                    <td><FontAwesomeIcon onClick={(e) => this.modalFechaOpen(4)} className="icons iconreport" icon={Icons.faFile}/></td>
                                </tr>
                                <tr>
                                    <td>{5}</td>
                                    <td>{data.reporte5}</td>
                                    <td><FontAwesomeIcon onClick={(e) => this.modalFechaOpen(5)} className="icons iconreport" icon={Icons.faFile}/></td>
                                </tr>
                                <tr>
                                    <td>{6}</td>
                                    <td>{data.reporte6}</td>
                                    <td><FontAwesomeIcon onClick={(e) => this.modalFechaOpen(6)} className="icons iconreport" icon={Icons.faFile}/></td>
                                </tr>
                                <tr>
                                    <td>{7}</td>
                                    <td>{data.reporte7}</td>
                                    <td><FontAwesomeIcon onClick={(e) => this.modalFechaOpen(7)} className="icons iconreport" icon={Icons.faFile}/></td>
                                </tr>
                                <tr>
                                    <td>{8}</td>
                                    <td>{data.reporte8}</td>
                                    <td><FontAwesomeIcon onClick={(e) => this.executeReport(8)} className="icons iconreport" icon={Icons.faFile}/></td>
                                </tr>
                                <tr>
                                    <td>{9}</td>
                                    <td>{data.reporte9}</td>
                                    <td><FontAwesomeIcon onClick={(e) => this.modalFechaOpen(9)} className="icons iconreport" icon={Icons.faFile}/></td>
                                </tr>
                                <tr>
                                    <td>{10}</td>
                                    <td>{data.reporte10}</td>
                                    <td><FontAwesomeIcon onClick={(e) => this.modalFechaOpen(10)} className="icons iconreport" icon={Icons.faFile}/></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Container>
                </Container>
            </div>
        )
    }
}