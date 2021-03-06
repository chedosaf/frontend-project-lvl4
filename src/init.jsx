import React from 'react';
import i18n from 'i18next';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { configureStore } from '@reduxjs/toolkit';
import filter from 'leo-profanity';
import AuthProvider from './providers/index.jsx';
import App from './components/App.jsx';
import resources from './locales/index.js';
import channelsReducer, {
  addChannel, removeChannel, renameChannel, setCurrentChannelId,
} from './slices/channelsSlice.js';
import messagesReducer, {
  addMessage,
} from './slices/messagesSlice.js';
import ApiContext from './contexts/ApiContext.jsx';

const init = (socketInit) => {
  const store = configureStore({
    reducer: {
      channels: channelsReducer,
      messages: messagesReducer,
    },
  });

  const socket = socketInit;

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  socket.on('connect', () => {
    console.log({ SoketConnected: socket.connected });
  });
  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
    store.dispatch(setCurrentChannelId(channel.id));
  });
  socket.on('removeChannel', (channel) => {
    store.dispatch(removeChannel(channel));
    store.dispatch(setCurrentChannelId(1));
  });
  socket.on('renameChannel', (channel) => {
    store.dispatch(renameChannel(channel));
  });

  filter.add(filter.getDictionary('ru'));

  const notifyActions = {
    newChannel: 'addChannellSuccess',
    removeChannel: 'removeChannellSuccess',
    renameChannel: 'renameChannellSuccess',

  };

  const sendMessage = (message, userName, curChennel, setBtnDisable) => socket.emit('newMessage', { message, auth: userName, chatId: curChennel }, (response) => {
    if (response.status === 'ok') {
      setBtnDisable(false);
    } else {
      setBtnDisable(false);
      throw Error('?????????????????? ???? ????????????????????');
    }
  });

  const userInfo = localStorage.getItem('userId');

  const channelChange = (changeName, values, setBtnDisable, notify) => {
    socket.emit(changeName, values, (response) => {
      if (response.status === 'ok') {
        setBtnDisable(false);
        notify[notifyActions[changeName]]();
      } else {
        setBtnDisable(false);
        notify.showChannellFailure();
      }
    });
  };

  const contexts = {
    sendMessage,
    channelChange,
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider userInfo={userInfo}>
          <Provider store={store}>
            <I18nextProvider i18n={i18n}>
              <ApiContext.Provider value={contexts}>
                <App />
              </ApiContext.Provider>
            </I18nextProvider>
          </Provider>
        </AuthProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
