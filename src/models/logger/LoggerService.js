const EventEmitter = require('events');
const {Logger} = require('./Logger');

const logEmitter = new EventEmitter();
logEmitter.on('log', function (instance, action, eventMessage, err) {
  let mes = '';
  if (err) {
    try {
      mes = eventMessage.errors.reduce(function (accumulator, currentValue) {
        accumulator += `"${currentValue.value}" - ${currentValue.message}; `;
        return accumulator;
      }, '');
    } catch (e) {
      mes = eventMessage.message;
    }
  } else {
    mes = JSON.stringify(eventMessage);
  }
  Logger.create({
    instance: instance,
    action: action,
    eventMessage: mes,
    error: !!err
  }, {logging: false});
});


module.exports = {
  logEmitter
};
