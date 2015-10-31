var getVerificationKey = function getVerificationKey (req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send(process.env.public_key);
};

module.exports = getVerificationKey;
