import React from 'react';
import DataTable from '../../components/DataTable';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default class Cliente extends React.Component {
    state = { 
        modalShowEliminar: false,
        infoEliminar: '',
        idEliminar: 0,
        reload: false
    };
    executeReport = (reportNumber) => {
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }

        axios.get(`http://localhost:3000/getReporte${reportNumber}`, config)
            .then((res) => {
                console.log('res', res)
                const link = res.data.link
                window.open('/Users/andreadasilva/Desktop/bases-de-datos/minerucab-backend/reports/outputs/Reporte1.html','_blank', '', false);
            })
            .catch((e) => {
                console.log(`Error con la ejecución del Reporte ${reportNumber}`);
            })
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
                                    <td><FontAwesomeIcon onClick={(e) => this.executeReport(1)} className="icons" icon={Icons.faFile}/></td>
                                </tr>
                                <tr>
                                    <td>{2}</td>
                                    <td>{data.reporte2}</td>
                                    <td><FontAwesomeIcon onClick={(e) => this.executeReport(2)} className="icons" icon={Icons.faFile}/></td>
                                </tr>
                                <tr>
                                    <td>{3}</td>
                                    <td>{data.reporte3}</td>
                                    <td><FontAwesomeIcon onClick={(e) => this.executeReport(3)} className="icons" icon={Icons.faFile}/></td>
                                </tr>
                                <tr>
                                    <td>{4}</td>
                                    <td>{data.reporte4}</td>
                                    <td><FontAwesomeIcon onClick={(e) => this.executeReport(4)} className="icons" icon={Icons.faFile}/></td>
                                </tr>
                                <tr>
                                    <td>{5}</td>
                                    <td>{data.reporte5}</td>
                                    <td><FontAwesomeIcon onClick={(e) => this.executeReport(5)} className="icons" icon={Icons.faFile}/></td>
                                </tr>
                                <tr>
                                    <td>{6}</td>
                                    <td>{data.reporte6}</td>
                                    <td><FontAwesomeIcon onClick={(e) => this.executeReport(6)} className="icons" icon={Icons.faFile}/></td>
                                </tr>
                                <tr>
                                    <td>{7}</td>
                                    <td>{data.reporte7}</td>
                                    <td><FontAwesomeIcon onClick={(e) => this.executeReport(7)} className="icons" icon={Icons.faFile}/></td>
                                </tr>
                                <tr>
                                    <td>{8}</td>
                                    <td>{data.reporte8}</td>
                                    <td><FontAwesomeIcon onClick={(e) => this.executeReport(8)} className="icons" icon={Icons.faFile}/></td>
                                </tr>
                                <tr>
                                    <td>{9}</td>
                                    <td>{data.reporte9}</td>
                                    <td><FontAwesomeIcon onClick={(e) => this.executeReport(9)} className="icons" icon={Icons.faFile}/></td>
                                </tr>
                                <tr>
                                    <td>{10}</td>
                                    <td>{data.reporte10}</td>
                                    <td><FontAwesomeIcon onClick={(e) => this.executeReport(10)} className="icons" icon={Icons.faFile}/></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Container>
                </Container>
            </div>
        )
    }
}