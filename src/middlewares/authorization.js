const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.JWT.SECRET;

//todo move to separate folder "middlewares" DONE
async function authorization(req, res, next) {
  let {token} = req.cookies;
  try {
   await jwt.verify(token, secret);
    next();
  } catch (e) {
    // todo remove cookie DONE
    // todo throw err DONE
    res.clearCookie('token');
    next({err: {type: '401'}});
  }
}

//todo that not BUG
async function logout(req, res) {
  res.clearCookie('token');
  res.redirect('/guest');
}

module.exports  = {
  authorization,
  logout
};
