const mongoose = require('mongoose');
const Project = require('./project.model');

const Task = mongoose.Schema({
  title: { type: String, require: [ true, 'Task\'s title is required' ] },
  done: { type: Boolean, default: false },
},
{
  timestamps: true
});

module.exports = mongoose.model('Task', Task);
