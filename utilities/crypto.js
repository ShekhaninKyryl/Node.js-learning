var crypto = require('crypto');
var config = require('../config');


function Encrypt (str) {
  var encrypt = crypto.createCipher(config.CRYPTO.ALGORITHM, config.CRYPTO.PASSWORD);
  var returnedStr = encrypt.update(str, 'utf8', 'hex');
  returnedStr+= encrypt.final('hex');
  return returnedStr;
}

function Decrypt (str) {
  var decrypt = crypto.createDecipher(config.CRYPTO.ALGORITHM, config.CRYPTO.PASSWORD);
  var returnedStr = decrypt.update(str, 'hex', 'utf8');
  returnedStr+= decrypt.final('utf8');
  return returnedStr;
}
module.exports = {
  Encrypt,
  Decrypt
};
