var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var credentialsSchema = new mongoose.Schema({
  username: String,
  password: String
});

credentialsSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

credentialsSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Credentials', credentialsSchema);
