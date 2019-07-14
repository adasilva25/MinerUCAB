import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import {history} from '../routers/History';
import Form from 'react-bootstrap/Form'

export default class ModalFecha extends React.Component {
  state = {
    diaI: '',
    mesI: '',
    anoI: '',
    diaF: '',
    mesF: '',
    anoF: '',
    ci: ''
  }
  onChangeNumber = (e) => {
    const number = e.target.value;

    if ((!number) || number.match(/^[0-9\b]+$/)){
      if (e.target.id === 'diaI'){
        this.setState({ diaI: e.target.value });
      }
      else if (e.target.id === 'mesI'){
        this.setState({ mesI: e.target.value });
      }
      else if (e.target.id === 'anoI'){
        this.setState({ anoI: e.target.value });
      }
      else if (e.target.id === 'diaF'){
        this.setState({ diaF: e.target.value });
      }
      else if (e.target.id === 'mesF'){
        this.setState({ mesF: e.target.value });
      }
      else if (e.target.id === 'anoF'){
        this.setState({ anoF: e.target.value });
      }
      else if (e.target.id === 'ci'){
        this.setState({ ci: e.target.value });
      }
    }
  }
  ejecutarReporte = () => {
    this.props.onHide()
    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        responseType: 'json'
    }

    let fecha_inicio = `${this.state.anoI}-${this.state.mesI}-${this.state.diaI}`;
    let fecha_fin = `${this.state.anoF}-${this.state.mesF}-${this.state.diaF}`;

    if (this.props.idReporte !== 7){
      axios.get(`http://localhost:3000/getReporte${this.props.idReporte}/${fecha_inicio}/${fecha_fin}`, config)
        .then((res) => {
            console.log('res', res)
            const link = res.data.link
            window.location.replace(link);
            let myWindow = window.open("", "_blank");
            myWindow.document.write(`<title>Reporte${this.props.idReporte}</title>`);
            myWindow.document.write('<img src="/images/MinerUCAB-logo.png" style="width: 25rem; height: 8%; background-color: #707070; margin-left: 18rem; margin-top: 1.5rem;"/>');
            myWindow.document.write(link);
            myWindow.focus()
        })
        .catch((e) => {
            console.log(`Error con la ejecución del Reporte ${this.props.idReporte}`);
        })
    }
    else if(this.props.idReporte === 7){
      let ci = document.getElementById('tipo-ci').value + this.state.ci

      axios.get(`http://localhost:3000/getReporte${this.props.idReporte}/${fecha_inicio}/${fecha_fin}/${ci}`, config)
        .then((res) => {
            console.log('res', res)
            const link = res.data.link
            window.location.replace(link);
            let myWindow = window.open("", "_blank");
            myWindow.document.write(`<title>Reporte${this.props.idReporte}</title>`);
            myWindow.document.write('<img src="/images/MinerUCAB-logo.png" style="width: 25rem; height: 8%; background-color: #707070; margin-left: 18rem; margin-top: 1.5rem;"/>');
            myWindow.document.write(link);
            myWindow.focus()
        })
        .catch((e) => {
            console.log(`Error con la ejecución del Reporte ${this.props.idReporte}`);
        })
    }
  }
  renderCedula = () => {
    if (this.props.idReporte === 7){
      return (
        <div>
        <Container className="modal-bc-description">
              <p className="modal-bc-description-text">
                  Introduzca la Cédula del empleado
              </p>
          </Container>
          <Container>
              <Form.Row>
                <Col md={2}></Col>
                <Col md={2}>
                    <Form.Group controlId="formGridState">
                        <Form.Control 
                          as="select" 
                          size="sm" 
                          id="tipo-ci"
                          className="modal-bc-input modal-bc-dropdown-cirif" 
                        >
                            <option>V</option>
                            <option>E</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formGridZip">
                        <Form.Control 
                          size="sm" 
                          className="modal-bc-input" 
                          id="ci"
                          onChange={this.onChangeNumber}
                          value={this.state.ci}
                        />
                    </Form.Group>
                </Col>
                <Col md={2}></Col>
              </Form.Row>
          </Container>
        </div>
      )
    }
  }
  render() {
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        keyboard={true}
        animation={true}
      >
        <Modal.Header closeButton className="modal-bc-title-bg modal-bc-title-text">
          <h6>Ejecutar Reporte</h6>
        </Modal.Header>
        <Modal.Body>
        {
          this.renderCedula()
        }
          <div className="modal-bc-description">
          <Form.Group>
          <Form.Label className="cliente-description-fields-text">Fecha Inicial</Form.Label>
              <Row className="div-content-date align-boxes">
                  <Form.Control
                      type="text" 
                      id="diaI"
                      className="form-date form-input form-input-day" 
                      placeholder="DD"
                      onChange={this.onChangeNumber}
                      value={this.state.diaI}
                  />                                                    
                      <Form.Text className="text-muted">
                          _
                      </Form.Text>
                  <Form.Control 
                      type="text" 
                      className="form-date form-input" 
                      placeholder="MM" 
                      id="mesI"
                      onChange={this.onChangeNumber}
                      value={this.state.mesI}
                  />                                                    
                      <Form.Text className="text-muted">
                          _
                      </Form.Text>
                  <Form.Control 
                      type="text" 
                      id="anoI"
                      className="form-date form-input"
                      placeholder="YYYY" 
                      onChange={this.onChangeNumber}
                      value={this.state.anoI}
                  />                                            
              </Row>
          <Form.Label className="cliente-description-fields-text box-separation">Fecha Final</Form.Label>
          <Row className="div-content-date align-boxes">
              <Form.Control 
                  type="text" 
                  id="diaF"
                  className="form-date form-input form-input-day" 
                  placeholder="DD"
                  onChange={this.onChangeNumber}
                  value={this.state.diaF}
              />                                                    
                  <Form.Text className="text-muted">
                      _
                  </Form.Text>
              <Form.Control 
                  type="text" 
                  className="form-date form-input" 
                  placeholder="MM" 
                  id="mesF"
                  onChange={this.onChangeNumber}
                  value={this.state.mesF}
              />                                                    
                  <Form.Text className="text-muted">
                      _
                  </Form.Text>
              <Form.Control 
                  type="text" 
                  id="anoF"
                  className="form-date form-input" 
                  onChange={this.onChangeNumber}
                  placeholder="YYYY" 
                  value={this.state.anoF}
              />                                            
          </Row>
        </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer className="button">
          <Container>
            <Row>
              <Col md={3}></Col>
              <Col md={6}>
                <Button 
                    onClick={this.ejecutarReporte} 
                    className="modal-bc-button btn-block"
                >
                    Enviar
                </Button>
              </Col>
              <Col md={3}></Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    );
  }
}