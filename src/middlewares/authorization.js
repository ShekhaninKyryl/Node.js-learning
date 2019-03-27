const jwt = require('jsonwebtoken');
const config = require('../config');
const MyError = require('../utilities/MyError');
const path = require('path');
const errorHandler = require('../utilities/errorHandler');
const secret = config.JWT.SECRET;

async function authorization(req, res, next) {
  let {token} = req.cookies;
  try {
    let result = await jwt.verify(token, secret);
    next();
  } catch (e) {
    res.clearCookie('token');
    res.locals.needRedirect = true;
    let err = new MyError(`You have to authorize: ${e.message}`, '401');
    err = errorHandler.errorParse(err, null, 'authorization');
    //res.sendFile('index.html', {root: path.join(__dirname, '../../dist')});
    //res.redirect('/guest');
    next(err);
  }
}




module.exports = {
  authorization,
};
