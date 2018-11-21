const mongoose = require('mongoose');
const crypto = require('crypto');

const { Schema } = mongoose;

const UsersSchema = new Schema({
  username: String,
  hash: String,
  salt: String,
});

//
UsersSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.statics.authenticate = function (username, password, callback) {
  Users.findOne({ username })
    .then( user => {
       if (!user || !user.validatePassword(password)) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      return callback(null , user)
    }).catch(err => callback(err));
}

var Users = mongoose.model('Users', UsersSchema);
module.exports = Users;
