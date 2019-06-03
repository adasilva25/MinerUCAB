import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class ModalComponent extends React.Component {
    render() {
      return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.props.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {this.props.content}
            </p>
          </Modal.Body>
          <Modal.Footer className="button">
            <Button onClick={this.props.onHide}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      );
    }
}