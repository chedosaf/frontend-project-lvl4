// @ts-check
import React from 'react';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';

const Message = (props) => {
  const { user } = props;
  const { message } = props;
  const { t } = useTranslation();
  filter.loadDictionary(t('locale'));
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
