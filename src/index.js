const express = require('express');
const webpack = require('webpack');


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
app.listen(config.SERVER.PORT);

