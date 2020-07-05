const bcrypt = require('bcrypt');

const isEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

const isPasswordOk = (user, password) => {
  return bcrypt.compareSync(password, user.password)
}

const verifyProject = async (req, Project) => {
  const project = await Project.findOne({ _id: req.params.projectId, owner: req.user._id });
  if (!project) {
    throw { status: 204, message: 'No project found' };
  }
  return project;
}

module.exports = {
  isEmail,
  isPasswordOk,
  verifyProject,
};
