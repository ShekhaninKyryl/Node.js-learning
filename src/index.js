const app = require('express')();
const server = require('http').Server(app);
const webpack = require('webpack');
const io = require('socket.io')(server);


const routers = require('./utilities/routers');
const config = require('./config');
const webpackConfig = require('../webpack.config');

//const app = express();
const compiler = webpack((webpackConfig));

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  writeToDisk: true
}));

//app.use('/', express.static(__dirname + '/dist'));
// io.engine.generateId = function (req) {
//   //console.log(req._query.email);
//   return req._query.email;
// };
const activeUser = {};

io.on('connection', socket => {
  socket.on('SET_USER', (user) => {
    activeUser[user.id] = {
      socketId: socket.id,
      name: user.name,
      email: user.email
    };
    io.sockets.emit('GET_USERS', activeUser);
  });
  socket.on('SEND_MESSAGE', message => {
    // Object.keys(activeUser).map(userId=>{
    //   io.to(activeUser[userId].socketId).emit('RECEIVE_MESSAGE', message);
    // });
    io.sockets.emit('RECEIVE_MESSAGE', message);
  });
  socket.on("disconnect", () => {
    let userId = Object.keys(activeUser).find(userId => activeUser[userId].socketId === socket.id);
    delete activeUser[userId];
    socket.broadcast.emit('GET_USERS', activeUser);
    console.log("Client disconnected", socket.id)
  });
});

app.use('', routers);


server.listen(config.SERVER.PORT);


