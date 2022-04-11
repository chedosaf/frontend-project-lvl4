// @ts-check
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Col, Row, Container,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
  addChannels, setCurrentChannelId,
} from '../slices/channelsSlice.js';
import { updateMessages } from '../slices/messagesSlice.js';
import ChannelsBar from './ChannelsBar.jsx';
import MainChatBar from './MainChatBar.jsx';
import getModal from './modal/index.js';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const Chat = (props) => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const { notify } = props;
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });
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
