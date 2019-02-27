var http = require('http');
var express = require('express');
var routers = require('./utilities/routers');
var config = require('./config');

var  app = express();

app.use('',routers);
app.listen(config.SERVER.PORT);

