const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('./../utils/validators');

const SALT_WORK_FACTOR = 10;

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
    const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;

    return next();

  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model('User', User);
