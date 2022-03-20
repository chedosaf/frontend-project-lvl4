// @ts-check
import React from 'react';

const Message = (props) => {
  const { user } = props;
  const { message } = props;
  return (
    <>
      <div className="message">
        <div className="messageAuth">
          <b>{user}</b>
          :
          {' '}
          {message}
        </div>
        <div className="messageText" />
      </div>
    </>
  );
};

export default Message;
