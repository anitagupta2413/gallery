import React, { useState } from "react";
import { Modal, Button, ModalTitle } from "react-bootstrap";

const ReactModal = ({
  showModal,
  handleClose,
  modalTitle,
  children,
  buttonText = 'Upload',
  buttonText2 = 'Close',
  handleSubmit
}) => {
  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          {buttonText}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          {buttonText2}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReactModal;
