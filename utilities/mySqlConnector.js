var mysql = require('mysql');
var config = require('../config');

var connect = mysql.createConnection({
  host: config.MYSQL.HOST,
  user: config.MYSQL.USER,
  password: config.MYSQL.PASSWORD,
  database: config.MYSQL.DATABASE
});

connect.connect(function (err) {
  if (err) throw err;
  console.log('Connected MySQL!');
});
//todo add emitter
module.exports = connect;
