const app = require('express')();
const server = require('http').Server(app);
const webpack = require('webpack');

const routers = require('./routers');
const config = require('./config');
const webpackConfig = require('../webpack.config');
const {initServer} = require('./chat');
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


initServer(server);
app.use('', routers);


server.listen(config.SERVER.PORT);


