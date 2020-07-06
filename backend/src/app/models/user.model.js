const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');
const { isEmail } = require('./../utils/validators');
const { hash } = require('./../utils/password');

const User = mongoose.Schema({
  id: {  },
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
  this.id = this._id;
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

User.plugin(toJson);

module.exports = mongoose.model('User', User);
