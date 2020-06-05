const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});



// Methods
UserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

  UserSchema.methods.generateJwt = function () {
    var JWT_SECRET1="SECRET#123";
  return jwt.sign({ _id: this._id},
     JWT_SECRET1,
  {
      expiresIn: "20m"
  });
}

const User = mongoose.model('User', UserSchema);

module.exports = User;