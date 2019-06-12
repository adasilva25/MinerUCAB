import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class ModalComponent extends React.Component {
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
          <Modal.Header closeButton className="modal-yesno-title-bg modal-yesno-title-text">
            <h4>Advertencia</h4>
          </Modal.Header>
          <Modal.Body>
            <Container className="modal-yesno-description">
                <p className="modal-yesno-description-text">
                    {this.props.mensaje}
                </p>
            </Container>
          </Modal.Body>
          <Modal.Footer className="button">
            <Container>
              <Row>
                <Col md={2}></Col>
                <Col md={4}>
                  <Button 
                      onClick={this.onSubmit} 
                      className="modal-yes-button btn-block"
                  >
                      Sí
                  </Button>
                </Col>
                <Col md={4}>
                  <Button 
                    onClick={this.onSubmit} 
                    className="modal-no-button btn-block"
                  >
                    No
                  </Button>
                </Col>
                <Col md={2}></Col>
              </Row>
            </Container>
          </Modal.Footer>
        </Modal>
      );
    }
}