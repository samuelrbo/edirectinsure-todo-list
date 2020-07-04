const mongoose = require('mongoose');
const Project = require('./project.model');

const Task = mongoose.Schema({
  title: { type: String, require: [ true, 'Task\'s title is required' ] },
  project: { type: mongoose.Types.ObjectId, ref: 'Project' },
  description: { type: String },
  conclusion: { type: Date }
},
{
  timestamps: true
});

module.exports = mongoose.model('Task', Task);
