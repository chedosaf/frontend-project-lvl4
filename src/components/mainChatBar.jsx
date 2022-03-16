import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import {
  Col, Container, Button, Form, Stack,
} from 'react-bootstrap';
import Message from './message.jsx';

const MainChatBar = () => {
  const socket = io();
  const inputRef = useRef();
  const [message, setMessage] = useState('');
  const storeMessages = useSelector((state) => state.channels.messages);
  const curChat = useSelector((state) => state.channels.currentChannelId);
  const activeChannel = useSelector((state) => {
    const channel = state
      .channels.channels.filter((el) => el.id === state.channels.currentChannelId)[0];
    if (!channel) {
      return null;
    }
    return channel.name;
  });

  const messageChange = ({ target }) => {
    setMessage(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem('userId'));
    socket.emit('newMessage', { message, auth: userId.username, chatId: curChat }, (response) => {
      if (response.status !== 'ok') {
        console.log('Сообщение не отправлено'); // подумать над интерфейсом
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
            {storeMessages.filter((el) => el.chatId === curChat).length.toString()}
            {' '}
            сообщений
          </span>
        </Container>
        <Container id="messages-box" className="chat-messages overflow-auto px-5 ">
          {storeMessages.filter((el) => el.chatId === curChat)
            .map((el) => <Message key={el.id} user={el.auth} message={el.message} />)}
        </Container>
        <Container className="mt-auto px-5 py-3">
          <Form noValidate="" className="py-1 border rounded-2" onSubmit={handleSubmit}>
            <Container className="input-group has-validation p-0">
              <Form.Control name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" value={message} onChange={messageChange} ref={inputRef} />
              <Stack direction="horizontal" gap={3}>
                <Button disabled="" type="submit" className="btn btn-group-vertical ms-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>
                  <span className="visually-hidden">Отправить</span>
                </Button>
              </Stack>
            </Container>
          </Form>
        </Container>
      </Col>
    </Col>
  );
};

export default MainChatBar;
