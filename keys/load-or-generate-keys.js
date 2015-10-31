var fs = require('fs');
var path = require('path');
var keypair = require('keypair');
var logger = require('winston');

var loadOrGenerateKeys = function () {
  var keyDir = process.env.KEY_DIR || __dirname;
  var privateKeyName = process.env.PRIVATE_KEY || 'key';
  var publicKeyName = process.env.PUBLIC_KEY || 'key.pub';
  var privateKey, publicKey, generatedKeys;

  try {
    // Load keys if they exist
    privateKey = fs.readFileSync(path.join(keyDir, privateKeyName));
    publicKey = fs.readFileSync(path.join(keyDir, publicKeyName));
    logger.debug('Loaded existing keys');
  } catch (e) {
    // Generat keys if they don't exist
    generatedKeys = keypair();
    privateKey = generatedKeys.private;
    publicKey = generatedKeys.public;

    // Save keys
    fs.writeFile(path.join(keyDir, privateKeyName), privateKey);
    fs.writeFile(path.join(keyDir, publicKeyName), publicKey);

    logger.debug('Generated new keys and wrote them to key directory');
  }

  process.env.private_key = privateKey;
  process.env.public_key = publicKey;

};

module.exports = loadOrGenerateKeys;
