import React from 'react';
import DataTable from '../../components/DataTable';
import OpcionesLocales from '../../components/OpcionesLocales';
import OpcionesGlobales from '../../components/OpcionesGlobales';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image';
import axios from 'axios';

export default class SolicitudCompra extends React.Component {
    state = {
        fecha: '',
        total: '',
        empresa: {
            clave: 0,
            nombre: '',
            estado: '',
            parroquia: '',
            municipio: '',
            rif: ''
        },
        pedidos: []
    }
    componentDidMount = () => {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            },
            responseType: 'json'
        }
        axios.get(`http://localhost:3000/getSolicitudDeCompraInfoById/${this.props.match.params.id}`, config)
            .then((res) => {
                let empresa = {}
                console.log('res', res)

                empresa.clave = res.data[0].clave_empresa
                empresa.nombre = res.data[0].nombre_empresa
                empresa.estado = res.data[0].estado
                empresa.parroquia = res.data[0].parroquia
                empresa.municipio = res.data[0].municipio
                empresa.rif = res.data[0].rif

                // const dia = date.getDate()
                // const mes = (date.getMonth() + 1)
                // const ano = date.getFullYear()
                // values.push(`${dia}/${mes}/${ano}`)

                this.setState(() => ({
                    empresa: empresa,
                    fecha: new Date(res.data[0].fecha).toLocaleString('sp-ve', { hour12: true }),
                    total: res.data[0].total
                }));


                axios.get(`http://localhost:3000/getDetalleSolicitudCompraMineralMetalicoById/${this.props.match.params.id}`, config)
                    .then((res) => {
                        let pedidos = []
                        console.log('res pedidos m', res)
                        res.data.forEach((item) => {
                            let pedido = {}

                            pedido.cantidad = item.cantidad;
                            pedido.nombre = item.nombre.toUpperCase();
                            pedido.precio = item.precio;

                            pedidos.push(pedido)
                        })

                        

                        this.setState((prevState) => ({
                            pedidos: prevState.pedidos.concat(pedidos)
                        }));

                    })
                    .catch((e) => {

                    })

                axios.get(`http://localhost:3000/getDetalleSolicitudCompraMineralNoMetalicoById/${this.props.match.params.id}`, config)
                    .then((res) => {
                        let pedidos = []
                        console.log('res pedidos noM', res)
                        res.data.forEach((item) => {
                            let pedido = {}

                            pedido.cantidad = item.cantidad;
                            pedido.nombre = item.nombre.toUpperCase();
                            pedido.precio = item.precio;

                            pedidos.push(pedido)
                        })

                        

                        this.setState((prevState) => ({
                            pedidos: prevState.pedidos.concat(pedidos)
                        }));


                    })
                    .catch((e) => {

                    })

            })
            .catch((e) => {

            })
            
    }
    renderPedidos = () => {
        return this.state.pedidos.map((pedido) => {
            return (
                <tr>
                    <td>1 KG {pedido.nombre}</td>
                    <td>{pedido.cantidad}</td>
                    <td>{pedido.precio}</td>
                    <td>{pedido.precio * pedido.cantidad}</td>
                </tr>
            )
        })
    }
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
                            <h4 className="sc-fecha">FECHA {this.state.fecha}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={7}>
                            <p className="sc-direccion-mu">Av. 5 de Julio</p>
                        </Col>
                        <Col md={4}>
                            <h4 className="sc-factura">FACTURA {this.props.match.params.id}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={7}>
                            <p className="sc-direccion-mu">Zona Industrial MMG</p>
                        </Col>
                        <Col md={4}>
                            <h4 className="sc-id-empresa">ID EMPRESA {this.state.empresa.clave}</h4>
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
                            <h2 className="sc-subtitle">{this.state.empresa.nombre}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <p className="sc-direccion-cliente">{this.state.empresa.parroquia}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <p className="sc-direccion-cliente">{this.state.empresa.municipio}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <p className="sc-direccion-cliente">{this.state.empresa.estado}, VENEZUELA</p>
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
                        
                        {this.renderPedidos()}
                        
                        <tr>
                            <td className="sc-final-empty-td"></td>
                            <td className="sc-final-empty-td"></td>
                            <td><h5>Subtotal US$</h5></td>
                            <td>{this.state.total}</td>
                        </tr>
                        <tr>
                            <td className="sc-final-empty-td"></td>
                            <td className="sc-final-empty-td"></td>
                            <td><h5>Total US$</h5></td>
                            <td>{this.state.total}</td>
                        </tr>
                        </tbody>
                    </Table>
                </Container>
            </Container>
        )
    }
}