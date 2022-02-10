import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Col, Row, Container, Button, Form, ListGroup,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { addChannels, addMessages, setCurrentChannelId } from '../slices/channelsSlice.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const Chat = () => {
  const [content, setContent] = useState('');
  const storeChannels = useSelector((state) => state.channels.channels);
  const storeMessages = useSelector((state) => state.channels.messages);
  const activeChannel = useSelector((state) => {
    const channel = state
      .channels.channels.filter((el) => el.id === state.channels.currentChannelId)[0];
    if (!channel) {
      return null;
    }
    return channel.name;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get('/api/v1/data', { headers: getAuthHeader() });
      const { channels } = data;
      const { messages } = data;
      const { currentChannelId } = data;
      dispatch(addChannels(channels));
      dispatch(addMessages(messages));
      dispatch(setCurrentChannelId(currentChannelId));
      setContent(data);
    };

    fetchContent();
  }, []);

  
  console.log(activeChannel);
  console.log(storeMessages.length);

  const ChannelsBar = () => (
    <>
      <Container md={2} className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </Container>
      <ListGroup className="flex-column nav-pills nav-fill px-2">
        {storeChannels.map((item) => {
          if (!item.removable) {
            return (
              <ListGroup.Item key={item.id} className="w-100">
                <button type="button" className="w-100 rounded-0 text-start btn">
                  <span className="me-1">#</span>
                  {item.name}
                </button>
              </ListGroup.Item>
            );
          } return (
            <ListGroup.Item key={item.id} className="w-100">
              <div role="group" className="d-flex dropdown btn-group">
                <Button type="button" className="w-100 rounded-0 text-start text-truncate btn">
                  <span className="me-1">#</span>
                  {item.name}
                </Button>
                <Button aria-haspopup="true" aria-expanded="false" type="button" className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn">
                  <span className="visually-hidden">
                    Управление каналом
                  </span>
                </Button>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );

  const MainChatBar = () => (
    <Col className="p-0 h-100">
      <Col md="auto" className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {activeChannel}
            </b>
          </p>
          <span className="text-muted">
            {storeMessages.length.toString()}
            {' '}
            сообщений
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 " />
        <div className="mt-auto px-5 py-3">
          <form noValidate="" className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <input name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" value="" />
              <div className="input-group-append">
                <button disabled="" type="submit" className="btn btn-group-vertical">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>
                  <span className="visually-hidden">Отправить</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </Col>
    </Col>
  );

  return (
    <>
      <Container className=" my-4 overflow-hidden rounded shadow" style={{ height: '700px' }}>
        <Row className="h-100 bg-white flex-md-row">
          <Col sm={2} className="border-end pt-5 px-0 bg-light">
            <ChannelsBar />
          </Col>
          <Col sm className="p-0 h-100">
            <MainChatBar />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Chat;
