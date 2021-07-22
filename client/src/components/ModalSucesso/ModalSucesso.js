import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useHistory } from 'react-router-dom';


const ModalSucesso = ({titulo}) => {
  let historico = useHistory();

  const redirecionarParaHomepage = () => {
    setTimeout(() => {
      historico.push('/');
    }, 2000);
  }


  return (
    <>
      <Modal
        show={true}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <h3 className="mx-auto">{titulo}</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <i className="fas fa-check-circle display-1 text-success"></i>
          </div>
          <div className="d-flex justify-content-center mt-3">
            Redirecionando para a página inicial...
          </div>
        </Modal.Body>
        <Modal.Footer>
          {redirecionarParaHomepage()}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalSucesso;