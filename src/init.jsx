import React from 'react';
import i18n from 'i18next';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import io from 'socket.io-client';
import { configureStore } from '@reduxjs/toolkit';
import AuthProvider from './providers/index.jsx';
import App from './components/app.jsx';
import Listener from './components/listenerContainer.jsx';
import resources from './locales/index.js';
import channelsReducer, {
  addMessage, addChannel, removeChannel, renameChannel, setCurrentChannelId,
} from './slices/channelsSlice.js';

const init = () => {
  const store = configureStore({
    reducer: {
      channels: channelsReducer,
    },
  });

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
    accessToken: '83b8de395eb445ca84c7ce8cfdbaf296',
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  const socket = io();

  socket.on('connect', () => {
    console.log(socket.connected);
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

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider>
          <Provider store={store}>
            <Listener>
              <I18nextProvider i18n={i18n}>
                <App />
              </I18nextProvider>
            </Listener>
          </Provider>
        </AuthProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
