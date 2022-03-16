import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
  messages: [],
};

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
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
    updateMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const {
  addChannels, addMessage, setCurrentChannelId, updateMessages, addChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
