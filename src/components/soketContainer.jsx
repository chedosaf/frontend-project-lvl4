import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import {
  addMessage, addChannel, removeChannel, renameChannel, setCurrentChannelId,
} from '../slices/channelsSlice.js';

const Listener = ({ children }) => {
  const socket = io();
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.connected);
    });
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
      dispatch(setCurrentChannelId(channel.id));
    });
    socket.on('removeChannel', (channel) => {
      dispatch(removeChannel(channel));
      dispatch(setCurrentChannelId(1));
    });
    socket.on('renameChannel', (channel) => {
      dispatch(renameChannel(channel));
    });
  }, []);

  return (
    <Container>
      {children}
    </Container>
  );
};

export default Listener;
