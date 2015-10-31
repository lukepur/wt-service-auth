var jwt = require('jsonwebtoken');
var Credentials = require('../models/credentials');

var login = function login (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: 'Both username and password are required'
    });
  }

  Credentials.findOne({username: req.body.username}, function (err, user) {
    var token;
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    if (!user.validPassword(req.body.password)) {
      return res.status(400).json({
        message: 'Incorrect password'
      });
    }

    token = jwt.sign({ sub: user._id }, process.env.private_key, { algorithm: 'RS256'});

    res.status(200).json({
      message: 'Login success',
      token: token
    });
  });

};

module.exports = login;
