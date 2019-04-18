const {Chat} = require("./Chat");


async function writeMessage(incomingMessage) {
  let writtenMessage = await Chat.create(incomingMessage);
  let {id, room, sender, message} = {...writtenMessage.dataValues};
  return {id, room, sender, message}
}

async function getMessages(room) {
  return await Chat.findAll({where: {room}});
}


module.exports = {
  writeMessage,
  getMessages
};
