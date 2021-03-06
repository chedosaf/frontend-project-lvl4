import { createSelector } from 'reselect';

const getChannels = (state) => state.channels.channels;
const getCurrentChannelId = (state) => state.channels.currentChannelId;
const selectActiveChannel = createSelector(getChannels, getCurrentChannelId,
  (channels, currentId) => channels.find(({ id }) => currentId === id)?.name);

export default { getChannels, getCurrentChannelId, selectActiveChannel };
