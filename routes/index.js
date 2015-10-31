var router = require('express').Router();
var signup = require('./signup');
var login = require('./login');
var getVerificationKey = require('./verification-key');

router.post('/signup', signup);
router.post('/login', login);
router.get('/verification-key', getVerificationKey);

module.exports = router;
