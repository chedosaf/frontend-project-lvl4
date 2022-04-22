// @ts-check
import React from 'react';
import {
  Modal, FormGroup, Container, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useApi from '../../hooks/useApiContext.js';

const ModalRemove = (props) => {
  const { channelChange } = useApi();
  const { t } = useTranslation();
  const {
    onHide,
    notify,
    btnDisable,
    setBtnDisable,
  } = props;

  const generateOnSubmit = ({ modalInfo }) => (e) => {
    e.preventDefault();
    const { item } = modalInfo;
    channelChange('removeChannel', { id: item.id }, setBtnDisable, notify);
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
        <Modal.Title>{t('removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('sure')}</p>
        <form onSubmit={onSubmit}>
          <FormGroup>

            <Container className="d-grid gap-2 d-md-flex mt-2 justify-content-md-end p-0">

              <Button variant="secondary" type="button" onClick={onHide} className="mr-md-2">
                {t('cancel')}
              </Button>

              <Button disabled={btnDisable} variant="danger" type="submit">
                {t('delete')}
              </Button>

            </Container>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRemove;
