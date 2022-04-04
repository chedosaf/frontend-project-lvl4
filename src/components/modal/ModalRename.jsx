// @ts-check
import React, { useEffect, useRef, useContext } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import {
  Modal, Form, Container, Button,
} from 'react-bootstrap';
import * as yup from 'yup';
import getters from '../../selectors/gettorsForUseSelector.js';
import SocketContext from '../../contexts/socketContext.jsx';

const ModalRename = (props) => {
  const socket = useContext(SocketContext);
  const { notify } = props;
  const storeChannels = useSelector(getters.getChannels);
  const storeChannelsNames = storeChannels.map((channel) => channel.name);
  const { modalInfo } = props;
  const { item } = modalInfo;
  const DisplayingErrorMessagesSchema = yup.object().shape({
    newchannelname: yup.string()
      .min(1, 'Обязательное поле').notOneOf(storeChannelsNames)
      .required('Required'),
  });

  const generateOnSubmit = ({ onHide }) => (values) => {
    socket.emit('renameChannel', { id: item.id, name: values.newchannelname });
    notify.renameChannellSuccess();
    onHide();
  };

  const { onHide } = props;

  const formik = useFormik({
    onSubmit: generateOnSubmit(props),
    validationSchema: DisplayingErrorMessagesSchema,
    initialValues: { newchannelname: item.name },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal
      show
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container fluid className="p-0">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Label className="visually-hidden" htmlFor="newchannelname">Имя канала</Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              name="newchannelname"
              type="newchannelname"
              value={formik.values.newchannelname}
              className="form-control"
              id="newchannelname"
              isInvalid={!!formik.errors.newchannelname}
              ref={inputRef}
            />
            {formik.errors.newchannelname
              ? <div className="invalid-feedback">{formik.errors.newchannelname}</div>
              : null}
            <Container className="d-grid gap-2 d-md-flex mt-2 justify-content-md-end p-0">

              <Button variant="secondary" type="button" onClick={onHide} className="mr-md-2">
                Отмена
              </Button>

              <Button variant="primary" type="submit">
                Отправить
              </Button>

            </Container>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRename;
