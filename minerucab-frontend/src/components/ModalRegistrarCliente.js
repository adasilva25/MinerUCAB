import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class ModalRegistrarCliente extends React.Component {
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
          <Modal.Header closeButton className="modal-rctipo-title-bg modal-yesno-title-text">
            <h4>Registrar Cliente</h4>
          </Modal.Header>
          <Modal.Body>
            <Container className="modal-rctipo-description">
                <p className="modal-rctipo-description-text">
                    ¿Qué tipo de cliente desea registrar?
                </p>
            </Container>
          </Modal.Body>
          <Modal.Footer className="button">
            <Container>
              <Row>
                <Col md={1}></Col>
                <Col md={5}>
                  <Button 
                      onClick={this.onSubmit} 
                      className="modal-rcnatural-button btn-block"
                  >
                      Cliente Natural
                  </Button>
                </Col>
                <Col md={5}>
                  <Button 
                    onClick={this.onSubmit} 
                    className="modal-rcjuridico-button btn-block"
                  >
                    Cliente Jurídico
                  </Button>
                </Col>
                <Col md={1}></Col>
              </Row>
            </Container>
          </Modal.Footer>
        </Modal>
      );
    }
}