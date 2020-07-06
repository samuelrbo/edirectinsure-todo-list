const mongoose = require('mongoose');
const Project = require('./project.model');
const toJson = require('@meanie/mongoose-to-json');

const Task = mongoose.Schema({
  title: { type: String, require: [ true, 'Task\'s title is required' ] },
  done: { type: Boolean, default: false },
},
{
  timestamps: true
});

Task.plugin(toJson);

module.exports = mongoose.model('Task', Task);
