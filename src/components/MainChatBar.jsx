// @ts-check
import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import { useSelector } from 'react-redux';
import {
  Col, Container, Button, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Message from './Message.jsx';
import getters from '../selectors/gettorsForUseSelector.js';
import sendMessageContext from '../contexts/sendMessageContext.jsx';

const MainChatBar = () => {
  const sendMessage = useContext(sendMessageContext);
  const { t } = useTranslation();
  const inputRef = useRef();
  const [message, setMessage] = useState('');
  const storeMessages = useSelector(getters.getMessages);
  const curChennel = useSelector(getters.getCurrentChannelId);
  const activeChannel = useSelector(getters.getActiveChannel);

  const messageChange = ({ target }) => {
    setMessage(target.value);
  };

  const currentMessages = storeMessages.filter((el) => el.chatId === curChennel);

  const handleSubmit = (e) => {
    e.preventDefault();
    const btn = document.querySelector('button[type="submit"]');
    btn.setAttribute('disabled', 'true');
    const userId = JSON.parse(localStorage.getItem('userId'));
    sendMessage(message, userId, curChennel, btn);
    setMessage('');
  };

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Col className="d-flex flex-column h-100">
      <Container className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {activeChannel}
          </b>
        </p>
        <span className="text-muted">
          {t('message', { count: currentMessages.length })}
        </span>
      </Container>
      <Container id="messages-box" className="chat-messages overflow-auto px-5 ">
        {currentMessages.map((el) => <Message key={el.id} user={el.auth} message={el.message} />)}
      </Container>
      <Container className="mt-auto px-5 py-3">
        <Form noValidate={false} className="form-inline border rounded-2" onSubmit={handleSubmit}>
          <Container fluid className="input-group p-0">
            <Form.Control
              name="body"
              aria-label="Новое сообщение"
              placeholder={t('enterMessage')}
              className="border-0 p-0 ps-2 form-control"
              value={message}
              onChange={messageChange}
              ref={inputRef}
            />
            <Button disabled={false} type="submit" className="btn m-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>
              <span className="visually-hidden">{t('send')}</span>
            </Button>
          </Container>
        </Form>
      </Container>
    </Col>
  );
};

export default MainChatBar;
