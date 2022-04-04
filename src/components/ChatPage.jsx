// @ts-check
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Col, Row, Container,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  addChannels, setCurrentChannelId,
  updateMessages,
} from '../slices/channelsSlice.js';
import ChannelsBar from './ChannelsBar.jsx';
import MainChatBar from './MainChatBar.jsx';
import getModal from './modal/index.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const Chat = (props) => {
  const dispatch = useDispatch();
  const { notify } = props;
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get('/api/v1/data', { headers: getAuthHeader() });
        const { channels } = data;
        const { messages } = data;
        const { currentChannelId } = data;
        dispatch(addChannels(channels));
        dispatch(updateMessages(messages));
        dispatch(setCurrentChannelId(currentChannelId));
      } catch {
        notify.fetchDataFailure();
      }
    };

    fetchContent();
  }, []);

  const renderModal = ({ modalInfo, hideModal }) => {
    if (!modalInfo.type) {
      return null;
    }

    const Component = getModal(modalInfo.type);
    return <Component modalInfo={modalInfo} onHide={hideModal} notify={notify} />;
  };

  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  return (
    <>
      <Container className=" my-4 overflow-hidden rounded shadow" style={{ height: '80vh' }}>
        <Row className="h-100 bg-white flex-md-row">
          <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
            <ChannelsBar showModal={showModal} />
          </Col>
          <Col className="p-0 h-100">
            <MainChatBar />
          </Col>
        </Row>
        {renderModal({ modalInfo, hideModal })}
      </Container>
    </>
  );
};

export default Chat;
