const mongoose = require('mongoose');
const { isEmail } = require('./../utils/validators');
const { hash } = require('./../utils/password');

const User = mongoose.Schema({
  name: { type: String, required: [ true, 'User\'s name is required' ] },
  email: { type: String,
    required: [ true, 'User\s email is required' ],
    validate: [ isEmail, 'Email is invalid' ],
    index: { unique: true }
  },
  password: { type: String , required: [ true, 'User\'s password is required' ] }
},
{
  timestamps: true
});

User.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    this.password = hash(this.password);

    return next();

  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model('User', User);
