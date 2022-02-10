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
    addMessages: (state, action) => {
      state.messages = action.payload;
    },
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
});

export const { addChannels, addMessages, setCurrentChannelId } = channelsSlice.actions;

export default channelsSlice.reducer;
