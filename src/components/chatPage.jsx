import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Col, Row, Container,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import {
  addChannels, setCurrentChannelId,
  updateMessages, addMessage, addChannel, removeChannel, renameChannel,
} from '../slices/channelsSlice.js';
import ChannelsBar from './channelsBar.jsx';
import MainChatBar from './mainChatBar.jsx';
import getModal from './modal/index.js';

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

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get('/api/v1/data', { headers: getAuthHeader() });
      const { channels } = data;
      const { messages } = data;
      const { currentChannelId } = data;
      console.log(channels);
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

  useEffect(() => {
    socket.on('removeChannel', (channel) => {
      dispatch(removeChannel(channel));
    });
  }, []);

  useEffect(() => {
    socket.on('renameChannel', (channel) => {
      dispatch(renameChannel(channel));
    });
  }, []);

  const renderModal = ({ modalInfo, hideModal, setItems }) => {
    if (!modalInfo.type) {
      return null;
    }

    const Component = getModal(modalInfo.type);
    return <Component modalInfo={modalInfo} setItems={setItems} onHide={hideModal} />;
  };

  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  return (
    <>
      <Container className=" my-4 overflow-hidden rounded shadow" style={{ height: '80vh' }}>
        <Row className="h-100 bg-white flex-md-row">
          <Col sm={2} className="border-end pt-5 px-0 bg-light">
            <ChannelsBar showModal={showModal} />
          </Col>
          <Col sm className="p-0 h-100">
            <MainChatBar />
          </Col>
        </Row>
        {renderModal({ modalInfo, hideModal })}
      </Container>
    </>
  );
};

export default Chat;
