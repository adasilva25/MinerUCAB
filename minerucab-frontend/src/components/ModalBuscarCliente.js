import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {history} from '../routers/History';
import axios from 'axios';

export default class ModalBuscarCliente extends React.Component {
  state = {
    ci: '',
    showMessage: false
  }
  onCIChange = (e) => {
    const ci = e.target.value;

    if (!ci || ci.match(/^[0-9\b]+$/)) {
      this.setState(() => ({ ci }));
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.ci);

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: 'json'
    }
    axios.get(`http://localhost:3000/getEmpleadoByCedula/${this.state.ci}`, config)
      .then((res) => {
          console.log(res)
          if (res.status === 200 && res.data.length === 1){
            history.push(`/gestionar_ventas/${res.data[0].id}`);
          } 
      }).catch((e) => {
          console.log('Error en axios')
          this.setState({ showMessage: true })
      })
  }
  renderError = () => {
    return (
      <Container>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <Button 
              onClick={this.onSubmit} 
              className="modal-bc-button modal-bc-btnerror btn-block"
          >
              Enviar de nuevo
          </Button>
        </Col>
        <Col md={3}></Col>
      </Row>
      </Container>
    )
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
          <h6>Buscar Cliente</h6>
        </Modal.Header>
        <Modal.Body>
          <Container className="modal-bc-description">
              <p className="modal-bc-description-text">
                  Introduzca la Cédula o el RIF del cliente
              </p>
          </Container>
          <Container>
              <Form.Row>
                <Col md={2}></Col>
                <Col md={2}>
                    <Form.Group controlId="formGridState">
                        <Form.Control as="select" size="sm" className="modal-bc-input modal-bc-dropdown-cirif">
                            <option>V</option>
                            <option>E</option>
                            <option>J</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="formGridZip">
                        <Form.Control 
                          size="sm" 
                          className="modal-bc-input" 
                          onChange={this.onCIChange}
                          value={this.state.ci}
                        />
                    </Form.Group>
                </Col>
                <Col md={2}></Col>
              </Form.Row>
                {
                  (this.state.showMessage === true && <p className="modal-bc-error-mg">¡Error! El cliente no está registrado en el sistema.</p>)
                }
          </Container>
          <div className="modal-bc-description">
            <Button 
              variant="link" 
              className="modal-bc-link-create bc-link-create-btn"
              onClick={()=>history.push('/registrar_cliente_natural')}
            >
              Registrar un nuevo cliente natural
            </Button>
            <Button 
              variant="link" 
              className="modal-bc-link-create bc-link-create-btn"
              onClick={()=>history.push('/registrar_cliente_juridico')}
            >
              Registrar un nuevo cliente jurídico
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer className="button">
        {this.state.showMessage === true ? this.renderError()
        :
          <Container>
            <Row>
              <Col md={3}></Col>
              <Col md={6}>
                <Button 
                    onClick={this.onSubmit} 
                    className="modal-bc-button btn-block"
                >
                    Enviar
                </Button>
              </Col>
              <Col md={3}></Col>
            </Row>
          </Container>
        }
        </Modal.Footer>
      </Modal>
    );
  }
}