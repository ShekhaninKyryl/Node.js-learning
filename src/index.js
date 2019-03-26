const express = require('express');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');


const routers = require('./utilities/routers');
const config = require('./config');
const webpackConfig = require('../webpack.config');

const app = express();
const compiler = webpack((webpackConfig));

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  writeToDisk: true
}));

app.use('/', express.static(__dirname + '/dist'));


app.use('', routers);
app.use(function (req, res) {
  console.log(`Request: [${req.method}]`, req.originalUrl);
  res.sendFile('index.html', {root: path.join(__dirname, '../dist')});
});


app.listen(config.SERVER.PORT);

