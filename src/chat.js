const {
  setEmployees,
  setOnlineEmployees,
  setEmployeeInfo,
  mesToEmployee,
  mesToServer,
  clearMessages,
  joinRoom,
  joinedRoom
} = require('../socketIOClientListeners__require__');

const {getEmployees} = require("./models/employee/EmployeeService");
const {writeMessage, getMessages} = require("./models/chat/chatService");

const socketIO = require('socket.io');
const MAIN_ROOM = '#general';

function initServer(server) {

  const io = socketIO(server);
  io.online = [];
  io.on('connection', async socket => {
    socket.info = {room: MAIN_ROOM};
    io.employees = await getEmployees({department: '*'});
    io.employees.push({email: socket.info.room, id: -1});

    await socket.join(socket.info.room);
    socket.emit(joinedRoom, MAIN_ROOM);
    await socket.emit(setEmployees, io.employees);

    await socket.emit(clearMessages);
    let messages = await getMessages(socket.info.room);
    await messages.map(message => {
      socket.emit(mesToEmployee, {text: message.dataValues.message, user: message.dataValues.sender});
    });

    socket.on(joinRoom, async (userId, room) => {
      let targetRoom;
      let roomForClient;
      if (room.match(/^#/)) {
        targetRoom = room;
        roomForClient = targetRoom;
      } else if (room) {
        let emp = io.employees.find(emp => room === emp.email ? emp : false);
        room = emp.id;
        targetRoom = (userId - room) < 0 ? `${userId}-${room}` : `${room}-${userId}`;
        roomForClient = emp.email;
      } else {
        targetRoom = MAIN_ROOM;
        roomForClient = targetRoom;
      }
      socket.leave(socket.info.room);
      socket.info.room = targetRoom;
      socket.join(socket.info.room);
      socket.emit(joinedRoom, roomForClient);
      let messages = await getMessages(socket.info.room);
      await socket.emit(clearMessages);
      await messages.map(message => {
        socket.emit(mesToEmployee, {text: message.dataValues.message, user: message.dataValues.sender});
      });
    });
    socket.on(setEmployeeInfo, (user) => {
      let {id, name, email} = user;
      socket.info = {...socket.info, id, name, email};
      io.online.push(socket.info);
      io.emit(setOnlineEmployees, io.online);
    });
    socket.on(mesToServer, async message => {
      let foundEmployee = io.employees.find(emp => emp.id === socket.info.id ? emp : false);
      if (foundEmployee.id === message.user) {
        await writeMessage({
          room: socket.info.room,
          sender: socket.info.id,
          message: message.text
        });
        socket.to(socket.info.room).emit(mesToEmployee, {...message, user: socket.info.id});
      }
    });
    socket.on("disconnect", () => {
      io.online = io.online.filter(user => {
        return user.id !== socket.info.id
      });
      io.emit(setOnlineEmployees, io.online);
    });
  });
}

module.exports = {
  initServer
};
