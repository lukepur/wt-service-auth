var jwt = require('jsonwebtoken');
var Credentials = require('../models/credentials');

var signup = function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: 'Both username and password are required'
    });
  }

  Credentials.findOne({username: req.body.username}, function (err, user) {
    var newUser;
    var token;

    if (err) {
      return next(err);
    }

    if (user) {
      return res.status(409).json({
        message: 'That username already exists'
      });
    }

    newUser = new Credentials({
      username: req.body.username
    });

    newUser.password = newUser.generateHash(req.body.password);

    newUser.save(function (err) {
      token = jwt.sign({ sub: newUser._id }, process.env.private_key, { algorithm: 'RS256'});
      return res.status(201).json({
        message: 'User created successfully',
        token: token
      });
    });
  });
};

module.exports = signup;
