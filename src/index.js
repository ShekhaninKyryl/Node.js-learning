const express = require('express');
const webpack = require('webpack');


const routers = require('./utilities/routers');
const config = require('./config');
const webpackConfig = require('../webpack.config');

const app = express();
const compiler = webpack((webpackConfig));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  publicPath: webpackConfig.output.publicPath
}));

// app.use(require('webpack-hot-middleware')(compiler));
// app.use(express.static('public'));

app.use('', routers);
app.listen(config.SERVER.PORT);

// import React from 'react';
// import  ReactDOM from 'react-dom';
// import App from './App.js';
//
// ReactDOM.render(<App/>, document.getElementById('root'));

