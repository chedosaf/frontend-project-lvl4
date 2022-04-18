// @ts-check
import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import { useSelector } from 'react-redux';
import { useStickyScroll } from 'use-chat-scroll';
import {
  Col, Container, Button, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.js';
import Message from './Message.jsx';
import channelsGetters from '../selectors/channelsSelectors.js';
import messagessGetters from '../selectors/messagesSelectors.js';
import sendMessageContext from '../contexts/sendMessageContext.jsx';

const MainChatBar = (props) => {
  const { btnDisable, setBtnDisable } = props;
  const sendMessage = useContext(sendMessageContext);
  const { t } = useTranslation();
  const auth = useAuth();
  const inputRef = useRef();
  const [message, setMessage] = useState('');
  const curChennel = useSelector(channelsGetters.getCurrentChannelId);
  const activeChannel = useSelector(channelsGetters.getActiveChannel);
  const currentMessages = useSelector(messagessGetters.getActiveMessages);

  const messageChange = ({ target }) => {
    setMessage(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnDisable(true);
    const userName = auth.getUserName();
    sendMessage(message, userName, curChennel, setBtnDisable);
    setMessage('');
  };

  const messageEl = useRef(null);

  useStickyScroll(messageEl, currentMessages);

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  }, [currentMessages]);

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
      <Container ref={messageEl} id="messages-box" className="chat-messages px-5 overflow-auto">
        {currentMessages.map((el) => <Message key={el.id} user={el.auth} message={el.message} />)}
      </Container>
      <Container className="mt-auto px-5 py-3">
        <Form noValidate={false} className="form-inline border rounded-2" onSubmit={handleSubmit}>
          <Container fluid className="input-group p-0">
            <Form.Control
              name="body"
              aria-label={t('newMessage')}
              placeholder={t('enterMessage')}
              className="border-0 p-0 ps-2 form-control"
              value={message}
              onChange={messageChange}
              ref={inputRef}
            />
            <Button disabled={btnDisable} type="submit" className="btn m-0">
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
