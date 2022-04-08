/* eslint no-param-reassign: ["error", { "props": false }] */

import { createSlice } from '@reduxjs/toolkit';
import initialState from './state.js';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    updateMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const {
  addMessage,
  updateMessages,
} = messagesSlice.actions;

export default messagesSlice.reducer;
