// @ts-check
import React from 'react';
import { Container } from 'react-bootstrap';
import filter from 'leo-profanity';

const Message = (props) => {
  const { user } = props;
  const { message } = props;
  return (
    <>
      <Container className="message">
        <div className="messageAuth text-break">
          <b>{user}</b>
          :
          {' '}
          {filter.clean(message)}
        </div>
        <Container className="messageText" />
      </Container>
    </>
  );
};

export default Message;
