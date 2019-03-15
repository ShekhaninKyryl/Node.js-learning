const crypto = require('crypto');
const config = require('../config');


/**
 * @return {string}
 */
function Encrypt (str) {
  const encrypt = crypto.createCipher(config.CRYPTO.ALGORITHM, config.CRYPTO.PASSWORD);
  let returnedStr = encrypt.update(str, 'utf8', 'hex');
  returnedStr+= encrypt.final('hex');
  return returnedStr;
}

/**
 * @return {string}
 */
function Decrypt (str) {
  const decrypt = crypto.createDecipher(config.CRYPTO.ALGORITHM, config.CRYPTO.PASSWORD);
  let returnedStr = decrypt.update(str, 'hex', 'utf8');
  returnedStr+= decrypt.final('utf8');
  return returnedStr;
}

/**
 * @return {string}
 */
function GetHash(str){
  const hash = crypto.createHash(config.CRYPTO.HASH_ALGORITHM);
  hash.update(str);
  return hash.digest('hex');
}

module.exports = {
  Encrypt,
  Decrypt,
  GetHash
};
