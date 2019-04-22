const {getEmployees} = require("../models/employee/EmployeeService");
const {writeMessage, getMessages} = require("../models/chat/chatService");

const socketIO = require('socket.io');


function initServer(server) {

  const io = socketIO(server);
  io.online = [];
  io.on('connection', async socket => {
    io.employees = await getEmployees({department: '*'});

    socket.info = {
      room: '#general',
    };
    await socket.join(socket.info.room);
    await socket.emit('setEmployees', io.employees);
    let messages = await getMessages(socket.info.room);
    await socket.emit('clearMessages');
    await messages.map(message => {
      socket.emit('mesToEmployee', {text: message.dataValues.message, user: message.dataValues.sender});
    });

    socket.on('joinToRoom', async (userId, room) => {
      let targetRoom;
      let roomForClient;
      if (room.match(/^#/)) {
        targetRoom = room;
        roomForClient = targetRoom;
      } else if (room) {
        let emp = io.employees.find(emp => room === emp.email ? emp : false);
        room = emp.id;
        targetRoom = (userId - room) < 0 ? `${userId}-${room}` : `${room}-${userId}`;//todo string DONE
        roomForClient = emp.email;
      } else {
        targetRoom = '#general';
        roomForClient = targetRoom;
      }

      socket.leave(socket.info.room);
      socket.info.room = targetRoom;
      socket.join(socket.info.room);
      socket.emit('joinedRoom', roomForClient);

      let messages = await getMessages(socket.info.room);
      await socket.emit('clearMessages');
      await messages.map(message => {
        socket.emit('mesToEmployee', {text: message.dataValues.message, user: message.dataValues.sender});
      });
    });

    socket.on('setEmployeeInfo', (user) => {
      let {id, name, email} = user;
      socket.info = {...socket.info, id, name, email};
      io.online.push(socket.info);
      io.emit('setOnlineEmployees', io.online);
    });

    socket.on('mesToServer', async message => {
      await writeMessage({
        room: socket.info.room,
        sender: socket.info.id,
        message: message.text
      });
      socket.to(socket.info.room).emit('mesToEmployee', {...message, user: socket.info.id});
    });
//todo not use # for email DONE
    socket.on("disconnect", () => {
      io.online = io.online.filter(user => {
        return user.id !== socket.info.id
      });
      io.emit('setOnlineEmployees', io.online);
    });

  });
}

module.exports = {
  initServer
};
