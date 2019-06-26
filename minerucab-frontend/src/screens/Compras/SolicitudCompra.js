import React from 'react';
import DataTable from '../../components/DataTable';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image';

export default class SolicitudCompra extends React.Component {
    render(){
        return (
            <Container>
                <Container>
                    <Row>
                        <Col md={7}>
                            <Image src="/images/MinerUCAB-logo.png" alt="LogoMinerUCAB" fluid className="sc-image-background"/>
                        </Col>
                        <Col md={5}>
                            <h1 className="sc-factura-title">FACTURA</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={7}>
                            <h1 className="sc-subtitle">Corporación Nacional de Desarrollo Mineral</h1>
                        </Col>
                        <Col md={5}>
                            <h4 className="sc-fecha">FECHA 25/06/2019</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={7}>
                            <p className="sc-direccion-mu">Av. 5 de Julio</p>
                        </Col>
                        <Col md={4}>
                            <h4 className="sc-factura">FACTURA 2050</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={7}>
                            <p className="sc-direccion-mu">Zona Industrial MMG</p>
                        </Col>
                        <Col md={4}>
                            <h4 className="sc-factura">ID EMPRESA 50</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h1 className="sc-empresa-aliada">EMPRESA ALIADA</h1>
                        </Col>
                        <Col md={6}></Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <h2 className="sc-subtitle">CVG INDUSTRIA VENEZOLANA DE ALUMINIO C.A. (VENALUM)</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <p className="sc-direccion-cliente">AV. FUERZAS ARMADAS</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <p className="sc-direccion-cliente">ZONA INDUSTRIAL MATANZAS</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <p className="sc-direccion-cliente">PUERTO ORDAZ, VENEZUELA</p>
                        </Col>
                    </Row>
                </Container>
                <Container className="sc-detalle-compra">
                    <Table striped bordered hover variant="light">
                        <thead>
                        <tr>
                            <th className="sc-th">DESCRIPCIÓN</th>
                            <th className="sc-th">CANTIDAD</th>
                            <th className="sc-th">PRECIO UNITARIO</th>
                            <th className="sc-th">PRECIO TOTAL</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1 KG VITRITA</td>
                            <td>2</td>
                            <td>3,000.000.00</td>
                            <td>6,000.000.00</td>
                        </tr>
                        <tr>
                            <td>1 KG FUSITA</td>
                            <td>3</td>
                            <td>1,500.000.00</td>
                            <td>4,500.000.00</td>
                        </tr>
                        <tr>
                            <td>1 KG CLARITA</td>
                            <td>1</td>
                            <td>1,000.000.00</td>
                            <td>1,000.000.00</td>
                        </tr>
                        <tr>
                            <td>1 KG DURITA</td>
                            <td>1,5</td>
                            <td>2,000.000.00</td>
                            <td>3,000.000.00</td>
                        </tr>
                        <tr>
                            <td className="sc-final-empty-td"></td>
                            <td className="sc-final-empty-td"></td>
                            <td><h5>Subtotal US$</h5></td>
                            <td>14,500.000.00</td>
                        </tr>
                        <tr>
                            <td className="sc-final-empty-td"></td>
                            <td className="sc-final-empty-td"></td>
                            <td><h5>Total US$</h5></td>
                            <td>14,500.000.00</td>
                        </tr>
                        </tbody>
                    </Table>
                </Container>
            </Container>
        )
    }
}