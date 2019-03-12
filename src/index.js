const express = require('express');
const routers = require('./utilities/routers');
const config = require('./config');

const app = express();

app.use('',routers);
app.listen(config.SERVER.PORT);

