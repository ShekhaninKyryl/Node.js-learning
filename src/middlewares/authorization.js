const jwt = require('jsonwebtoken');
const config = require('../config');
const MyError = require('../utilities/MyError');
const secret = config.JWT.SECRET;

async function authorization(req, res, next) {
  let {token} = req.cookies;
  try {
    await jwt.verify(token, secret);
    next();
  } catch (e) {
    res.clearCookie('token');
    res.locals.needRedirect = true;
    let err = new MyError(`You have to authorize: ${e.message}`, '401');

    next({err});
  }
}

module.exports = {
  authorization,
};
