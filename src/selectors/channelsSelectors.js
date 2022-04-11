const getChannels = (state) => state.channels.channels;
const getCurrentChannelId = (state) => state.channels.currentChannelId;
const getActiveChannel = (state) => {
  const channel = state
    .channels.channels.filter((el) => el.id === state.channels.currentChannelId)[0];
  if (!channel) {
    return null;
  }
  return channel.name;
};

export default { getChannels, getCurrentChannelId, getActiveChannel };
