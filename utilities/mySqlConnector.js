var mysql = require('mysql');
var EventEmitter = require('events');
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
//todo add emitter DONE

var logEmitter = new EventEmitter();
logEmitter.on('log', function (instance, action, eventMessage, err) {

  queryArray = [
    instance,
    action,
    eventMessage,
    err ? 0: 1
  ];
  var sql = 'INSERT INTO log SET instance = ?, action = ?, message = ?, successful = ?';
  connect.query(sql, queryArray, function (err, res) {
    var a;
  });
});

module.exports = {
  connect,
  logEmitter
};
