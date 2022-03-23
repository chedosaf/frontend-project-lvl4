// @ts-check
import React, { useContext } from 'react';
import {
  Modal, FormGroup, Container, Button,
} from 'react-bootstrap';
import SocketContext from '../../contexts/socketContext.jsx';


const Remove = (props) => {
  const socket = useContext(SocketContext);
  const { onHide } = props;
  const { notify } = props;

  const generateOnSubmit = ({ modalInfo }) => (e) => {
    e.preventDefault();
    const { item } = modalInfo;
    socket.emit('removeChannel', { id: item.id });
    notify.removeChannellSuccess();
    onHide();
  };
  const onSubmit = generateOnSubmit(props);

  return (
    <Modal
      show
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>
        <form onSubmit={onSubmit}>
          <FormGroup>

            <Container className="d-grid gap-2 d-md-flex mt-2 justify-content-md-end p-0">

              <Button variant="secondary" type="button" onClick={onHide} className="mr-md-2">
                Отмена
              </Button>

              <Button variant="danger" type="submit">
                Удалить
              </Button>

            </Container>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
