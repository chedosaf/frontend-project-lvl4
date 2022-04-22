// @ts-check
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import {
  Modal, Form, Container, Button,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import channelsSelectors from '../../selectors/channelsSelectors.js';
import useApi from '../../hooks/useApiContext.js';

const ModalAdd = (props) => {
  const { channelChange } = useApi();
  const {
    onHide,
    notify,
    btnDisable,
    setBtnDisable,
  } = props;
  const { t } = useTranslation();
  const storeChannels = useSelector(channelsSelectors.getChannels);
  const storeChannelsNames = storeChannels.map((channel) => channel.name);

  const DisplayingErrorMessagesSchema = yup.object().shape({
    newchannelname: yup.string()
      .min(1, t('validationErrors.required')).notOneOf(storeChannelsNames)
      .required(t('validationErrors.required')),
  });

  const generateOnSubmit = (values) => {
    setBtnDisable(true);
    channelChange('newChannel', { name: values.newchannelname }, setBtnDisable, notify);
    onHide();
  };

  const formik = useFormik({
    onSubmit: generateOnSubmit,
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
        <Modal.Title>{t('addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container fluid className="p-0">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Label className="visually-hidden" htmlFor="newchannelname">{t('channelName')}</Form.Label>
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
                {t('cancel')}
              </Button>

              <Button disabled={btnDisable} variant="primary" type="submit">
                {t('send')}
              </Button>

            </Container>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAdd;
