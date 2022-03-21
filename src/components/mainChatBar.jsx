// @ts-check
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import {
  Col, Container, Button, Form,
} from 'react-bootstrap';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import Message from './message.jsx';
import getters from './gettorsForUseSelector.js';

const MainChatBar = () => {
  const socket = io();
  const { t } = useTranslation();
  filter.loadDictionary(t('locale'));
  const inputRef = useRef();
  const [message, setMessage] = useState('');
  const storeMessages = useSelector(getters.getMessages);
  const curChennel = useSelector(getters.getCurrentChannelId);
  const activeChannel = useSelector(getters.getActiveChannel);

  const messageChange = ({ target }) => {
    const filtredMessage = filter.clean(target.value);
    setMessage(filtredMessage);
  };

  const messagesCount = storeMessages.filter((el) => el.chatId === curChennel).length.toString();

  const handleSubmit = (e) => {
    e.preventDefault();
    const btn = document.querySelector('button[type="submit"]');
    btn.setAttribute('disabled', 'true');
    const userId = JSON.parse(localStorage.getItem('userId'));
    socket.emit('newMessage', { message, auth: userId.username, chatId: curChennel }, (response) => {
      if (response.status === 'ok') {
        btn.removeAttribute('disabled');
      } else {
        btn.removeAttribute('disabled');
        throw Error('сообщение не отправлено');
      }
    });
    setMessage('');
  };

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Col className="p-0 h-100">
      <Col md="auto" className="d-flex flex-column h-100">
        <Container className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {activeChannel}
            </b>
          </p>
          <span className="text-muted">
            {t('message', { count: +messagesCount })}
          </span>
        </Container>
        <Container id="messages-box" className="chat-messages overflow-auto px-5 ">
          {storeMessages.filter((el) => el.chatId === curChennel)
            .map((el) => <Message key={el.id} user={el.auth} message={el.message} />)}
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
                {t('send')}
              </Button>
            </Container>
          </Form>
        </Container>
      </Col>
    </Col>
  );
};

export default MainChatBar;
