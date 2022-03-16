import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Col, Row, Container,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import {
  addChannels, setCurrentChannelId, updateMessages, addMessage, addChannel,
} from '../slices/channelsSlice.js';
import ChannelsBar from './channelsBar.jsx';
import ModalWindow from './modal.jsx';
import MainChatBar from './mainChatBar.jsx';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const Chat = () => {
  const socket = io();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get('/api/v1/data', { headers: getAuthHeader() });
      const { channels } = data;
      const { messages } = data;
      const { currentChannelId } = data;
      console.log(messages);
      console.log(channels);
      console.log(currentChannelId);
      dispatch(addChannels(channels));
      dispatch(updateMessages(messages));
      dispatch(setCurrentChannelId(currentChannelId));
    };

    fetchContent();
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.connected);
    });
  }, []);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
  }, []);

  useEffect(() => {
    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
    });
  }, []);

  return (
    <>
      <Container className=" my-4 overflow-hidden rounded shadow" style={{ height: '80vh' }}>
        <Row className="h-100 bg-white flex-md-row">
          <Col sm={2} className="border-end pt-5 px-0 bg-light">
            <ChannelsBar modalShow={handleShow} />
          </Col>
          <Col sm className="p-0 h-100">
            <MainChatBar />
          </Col>
        </Row>
        <ModalWindow modalClose={handleClose} show={show} />
      </Container>
    </>
  );
};

export default Chat;
