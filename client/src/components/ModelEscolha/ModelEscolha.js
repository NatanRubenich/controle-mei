import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useHistory } from 'react-router-dom';


const ModalEscolha = ({ titulo, texto, botao, callback }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleClickDelete = () => {
    handleClose();
    callback();
  }

  return (
    <>
      <button className="btn btn-danger m-1" onClick={handleShow}><i className="fas fa-trash"></i></button>

      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <h3 className="mx-auto">{titulo && titulo}</h3>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer variant="outline-danger" class="mx-auto mb-3">
          <button className="btn btn-secondary m-2" onClick={handleClose}>Não</button>
          <button className="btn btn-danger m-2" onClick={handleClickDelete}>Sim</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEscolha;