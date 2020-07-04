const mongoose = require('mongoose');

const User = require('./user.model');
const Task = require('./task.model');

const Project = mongoose.Schema({
  title: { type: String, required: [ true, 'Project\'s title is required' ] },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: Task }]
},
{
  timestamps: true
});

module.exports = mongoose.model('Project', Project);
