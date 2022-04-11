const getActiveMessages = (state) => state.messages.messages
  .filter((el) => el.chatId === state.channels.currentChannelId);

export default { getActiveMessages };
