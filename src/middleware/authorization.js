const jwt = require('jsonwebtoken');
const User = require('../models/account');
const notification = require('../models/notification');
const vipstagement = require('../models/purchage');
const requireAuth = (req, res, next) => {
  const token = req?.cookies?.user;
  if (token) {
    jwt.verify(token, 'Hutech', (err, decoded) => {
      if (err) {
        console.log('this is err: ',err);
        res.redirect('/signup/login');
      }
      else {
        req.data = decoded;
        next();
      }
    })
  }
  else {
    res.redirect('/signup/login');
  }
}

// chekc current user
const checkUser = (req, res, next) => {
  const token = req.cookies.user;
  if (token) {
    jwt.verify(token, 'Hutech', async (err, decodedToken) => {
      if (err) {
        console.log('Token Trống');
        res.locals.user = null;
        res.locals.status = null;
        next();
      } else {
        let [user, vip,status] = await Promise.all([User.findById(decodedToken.id),vipstagement.findOne({user:decodedToken.id}).sort({_id:-1}),notification.findOne({user:decodedToken.id})]);
        if(status )
        res.locals.status = status;
        else
        res.locals.status = null;
        if(vip)
        user['vip'] = vip;
        req.data = user;
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    res.locals.status = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };