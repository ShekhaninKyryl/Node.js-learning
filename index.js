var http = require('http');
var routers = require('./utilities/routers');
var config = require('./config');

http.createServer(routers.serverConfig).listen(config.SERVER.PORT);
