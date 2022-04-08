/* eslint no-param-reassign: ["error", { "props": false }] */

import { createSlice } from '@reduxjs/toolkit';
import initialState from './state.js';

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, action) => {
      state.channels = action.payload;
    },
    addChannel: (state, action) => {
      state.channels = [...state.channels, action.payload];
    },
    removeChannel: (state, action) => {
      state.channels = state.channels.filter((el) => el.id !== action.payload.id);
    },
    renameChannel: (state, action) => {
      state.channels = state.channels
        .map((el) => {
          if (el.id === action.payload.id) {
            return action.payload;
          }
          return el;
        });
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    updateMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const {
  addChannels, addMessage,
  setCurrentChannelId, updateMessages, addChannel, removeChannel, renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
