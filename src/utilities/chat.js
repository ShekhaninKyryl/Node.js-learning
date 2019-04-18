const {getEmployees} = require("../models/employee/EmployeeService");
const {writeMessage, getMessages} = require("../models/chat/chatService");

const socketIO = require('socket.io');


function initServer(server) {
  const rooms = [];

  const io = socketIO(server);
  io.online = {};
  io.on('connection', async socket => {
    io.employees = await getEmployees({department: '*'});


    socket.info = {
      room: 'general',
    };
    socket.join(socket.info.room);
    socket.emit('setEmployees', io.employees);
    let messages = await getMessages(socket.info.room);
    messages.map(message => {
      socket.emit('RECEIVE_MESSAGE', {text: message.dataValues.message, user: message.dataValues.sender});
    });

    socket.on('JOIN_ROOM', async (id1, id2) => {
      if (id2) {
        let Id = (id1 - id2) < 0 ? id1 + '-' + id2 : id2 + '-' + id1;
        socket.leave(socket.info.room);
        socket.info.room = Id;
        socket.join(socket.info.room);
        socket.emit('JOINED', socket.info.room);
      } else {
        let Id = 'general';
        socket.info.room = Id;
        socket.join(socket.info.room);
        socket.emit('JOINED', socket.info.room);
      }
      let messages = await getMessages(socket.info.room);
      messages.map(message => {
        socket.emit('RECEIVE_MESSAGE', {text: message.dataValues.message, user: message.dataValues.sender});
      });
    });


    socket.on('SET_USER', (user) => {
      let {id, name, email} = user;
      socket.info = {...socket.info, id, name, email};
      io.online[socket.info.id] = socket.info;
      io.emit('GET_USERS', io.online);
    });
    socket.on('SEND_MESSAGE', async message => {
      await writeMessage({
        room: socket.info.room,
        sender: socket.info.id,
        message: message.text
      });
      socket.to(socket.info.room).emit('RECEIVE_MESSAGE', {...message, user: socket.info.name});
    });
    socket.on("disconnect", () => {
      delete io.online[socket.info.id];
      io.emit('GET_USERS', io.online);
      console.log("Client disconnected", socket.id)
    });
  });
}

module.exports = {
  initServer
};
