import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal, Form, Container, Button,
} from 'react-bootstrap';
import io from 'socket.io-client';
import * as yup from 'yup';
import { setCurrentChannelId } from '../../slices/channelsSlice.js';

const Add = (props) => {
  const socket = io();
  const dispatch = useDispatch();
  const storeChannels = useSelector((state) => state.channels.channels);
  const storeChannelsNames = storeChannels.map((channel) => channel.name);

  const DisplayingErrorMessagesSchema = yup.object().shape({
    newchannelname: yup.string()
      .min(1, 'Обязательное поле').notOneOf(storeChannelsNames)
      .required('Required'),
  });

  const generateOnSubmit = ({ onHide }) => (values) => {
    const btn = document.querySelector('button[type="submit"]');
    btn.setAttribute('disabled', 'true');
    socket.emit('newChannel', { name: values.newchannelname }, (response) => {
      if (response.status === 'ok') {
        btn.removeAttribute('disabled');
        dispatch(setCurrentChannelId(response.data.id));
      }
    });
    console.log(storeChannelsNames);
    onHide();
  };

  const { onHide } = props;

  const formik = useFormik({
    onSubmit: generateOnSubmit(props),
    validationSchema: DisplayingErrorMessagesSchema,
    initialValues: { newchannelname: '' },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal
      show
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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

export default Add;

/*
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
  ); */
