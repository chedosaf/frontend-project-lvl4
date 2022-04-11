// @ts-check
import React from 'react';
import filter from 'leo-profanity';

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
          {filter.clean(message)}
        </div>
        <div className="messageText" />
      </div>
    </>
  );
};

export default Message;
