const crypto = require('crypto');
const config = require('../config');


/**
 * @return {string}
 */
function GetHash(str){
  const hash = crypto.createHash(config.CRYPTO.HASH_ALGORITHM);
  hash.update(str);
  return hash.digest('hex');
}

module.exports = {
  GetHash
};
