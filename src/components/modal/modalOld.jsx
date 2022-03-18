import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import io from 'socket.io-client';
import * as yup from 'yup';
import {
  Button, Modal, Form, Container,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannelId } from '../../slices/channelsSlice.js';

const ModalWindow = (props) => {
  const { show } = props;
  const { modalClose } = props;
  const socket = io();
  const dispatch = useDispatch();
  const storeChannels = useSelector((state) => state.channels.channels);
  const storeChannelsNames = storeChannels.map((channel) => channel.name);

  const DisplayingErrorMessagesSchema = yup.object().shape({
    newchannelname: yup.string()
      .min(1, 'Обязательное поле').notOneOf(storeChannelsNames)
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      newchannelname: '',
    },
    validationSchema: DisplayingErrorMessagesSchema,
    onSubmit: (values) => {
      socket.emit('newChannel', { name: values.newchannelname }, (response) => {
        dispatch(setCurrentChannelId(response.data.id));
      });
      formik.resetForm();
      modalClose();
    },
  });

  return (
    <>
      <Modal show={show} onHide={modalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Container fluid className="p-0">
            <Form onSubmit={formik.handleSubmit}>

              <Form.Control
                onChange={formik.handleChange}
                name="newchannelname"
                type="newchannelname"
                value={formik.values.newchannelname}
                className="form-control"
                id="newchannelname"
                isInvalid={!!formik.errors.newchannelname}
              />
              {formik.errors.newchannelname
                ? <div className="invalid-feedback">{formik.errors.newchannelname}</div>
                : null}
              <Container className="d-grid gap-2 d-md-flex mt-2 justify-content-md-end p-0">

                <Button variant="secondary" type="button" onClick={modalClose} className="mr-md-2">
                  Отмена
                </Button>

                <Button variant="primary" type="submit reset">
                  Отправить
                </Button>

              </Container>
            </Form>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalWindow;
