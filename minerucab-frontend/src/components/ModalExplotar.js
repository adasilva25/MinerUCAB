import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {history} from '../routers/History';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';

export default class ModalExplotar extends React.Component {
  onSubmit = () => {
    const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'json'
        }
        console.log(this.props.minMet)

    for(let i=0; i<this.props.minNoMet.length; i++){
      axios.get(`http://localhost:3000/getEmpresaMinNoMetComponentesSolicitudDeCompra/${this.props.minNoMet[i].clave}`, config)
        .then((res) => {
          console.log(res)
            console.log("minnm",this.props.minNoMet[i].clave)
            let info = {
              total: res.data[0].precio_venta,
              fk_empresa: res.data[0].clave,
              fk_explotacion: this.props.exp,
              cantidad: (2*this.props.minNoMet[i].porcentaje/100),
              fk_mineral_empresa: res.data[0].relacion,
            }
            console.log(info)
            const configur = {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    responseType: 'json',
                    data: info
                }
            axios.post('http://localhost:3000/crearSolCompra', configur)
                .then((res) => {
                }).catch((e) => {
                    console.log('Error en axios')
                })
        })
        .catch((e) => {
            console.log('Error con el modal explotar');
        })
    }
    for(let i=0; i<this.props.minMet.length; i++){
      console.log(this.props.minMet[i])
      axios.get(`http://localhost:3000/getEmpresaMinMetComponentesSolicitudDeCompra/${this.props.minMet[i].clave}`, config)
        .then((res) => {
            console.log("min",this.props.minMet[i].clave)
            let info = {
              total: res.data[0].precio_venta,
              fk_empresa: res.data[0].clave,
              fk_explotacion: this.props.exp,
              cantidad: (2*this.props.minMet[i].porcentaje/100),
              fk_mineral_empresa: res.data[0].relacion,
            }
            console.log(info)
            const configur = {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    responseType: 'json',
                    data: info
                }
            axios.post('http://localhost:3000/crearSolCompra', configur)
                .then((res) => {
                }).catch((e) => {
                    console.log('Error en axios')
                })
        })
        .catch((e) => {
            console.log('Error con el modal explotar');
        })
    }

  }
    render() {
      return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          keyboard={true}
          animation={true}
        >
          <Modal.Header closeButton className="modal-explotar-aviso-bg modal-yesno-title-text">
            <h4>Alerta</h4>
          </Modal.Header>
          <Modal.Body>
            <Container className="modal-rctipo-description">
                <p className="modal-rctipo-description-text">
                    {
                      this.props.infoExplotar
                    }
                </p>
                {/*
                  (this.props.minMet.length>1)&&
                  this.props.minMet.map((minMet, index) => {
                    return (
                        <Form.Row className="div-min-met-presentaciones-form" key={index} id={'formpres'+index}>
                            <Col md={12}>
                                <Row>
                                    <Col md={1}></Col>
                                    <Col md={5}>
                                        <Form.Label className="cliente-description-fields-text">Mineral</Form.Label>
                                        <Form.Control 
                                            key={index} 
                                            id={''+index}
                                            className="form-input form-input-dropdown-mineral-met-presentacion"
                                            value={minMet.nombre}
                                            disabled={true}
                                        />
                                    </Col>
                                    <Col md={5}>
                                        <Form.Label className="cliente-description-fields-text">Empresa</Form.Label>
                                            <Form.Group>
                                                <InputGroup className="MyInputGroup">
                                                    <Form.Control 
                                                        className="form-input form-input-dropdown-mineral-met-presentacion" 
                                                        key={index} 
                                                        id={''+index}
                                                    >
                                                    {
                                                      this.onrender('met', minMet.clave)
                                                    }
                                                    </Form.Control>
                                                </InputGroup>
                                            </Form.Group>
                                    </Col>
                                    <Col md={1}></Col>
                                </Row>
                            </Col>
                        </Form.Row>
                    )})
                */}
            </Container>
          </Modal.Body>
          <Modal.Footer className="button">
            <Container>
                {
                  (this.props.tipoSol==='NA')&&
                  <Row>
                  <Col md={2}></Col>
                  <Col md={4}>
                    <Button 
                        onClick={() => history.push('/home')} 
                        className="modal-explotar-aviso-button btn-block"
                    >
                        Cancelar
                    </Button>
                  </Col>
                  <Col md={4}>
                    <Button 
                        onClick={this.onSubmit} 
                        className="modal-explotar-aviso-button btn-block"
                    >
                        Enviar
                    </Button>
                  </Col>
                  <Col md={2}></Col>
                  </Row>
                }
                {
                  (this.props.tipoSol==='En proceso')&&
                  <Row>
                  <Col md={4}></Col>
                  <Col md={4}>
                    <Button 
                        onClick={() => history.push('/solicitud_compra')} 
                        className="modal-explotar-aviso-button btn-block"
                    >
                        Ok
                    </Button>
                  </Col>
                  <Col md={4}></Col>
                  </Row>
                }
            </Container>
          </Modal.Footer>
        </Modal>
      );
    }
}