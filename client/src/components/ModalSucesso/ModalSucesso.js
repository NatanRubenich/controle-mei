import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useHistory } from 'react-router-dom';


const ModalSucesso = ({ titulo, texto, url, callback}) => {
  let historico = useHistory();

  const redirecionar = () => {
    setTimeout(() => {
      historico.push(url);
      if(callback) {
        callback();
      }
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
            {texto}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {redirecionar()}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalSucesso;