/* eslint no-param-reassign: ["error", { "props": false }] */

import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
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
