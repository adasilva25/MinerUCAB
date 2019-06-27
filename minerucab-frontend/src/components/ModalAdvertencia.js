import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

export default class ModalComponent extends React.Component {
  eliminarEnBD = () => {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      responseType: 'json'
    }

    axios.delete(this.props.urleliminar, config)
      .then((res) => {
        console.log(res);
        this.props.onHide
      })
      .catch((e) => {
        console.log(e)
      })

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
        <Modal.Header closeButton className="modal-yesno-title-bg modal-yesno-title-text">
          <h4>Advertencia</h4>
        </Modal.Header>
        <Modal.Body>
          <Container className="modal-yesno-description">
              <p className="modal-yesno-description-text">
                  {this.props.mensaje + ' ' + this.props.infoeliminar}
              </p>
          </Container>
        </Modal.Body>
        <Modal.Footer className="button">
          <Container>
            <Row>
              <Col md={4}></Col>
              <Col md={4}>
                <Button 
                  onClick={this.props.onHide} 
                  className="modal-no-button btn-block"
                >
                  OK
                </Button>
              </Col>
              <Col md={4}></Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    );
  }
}