const Project = require('./../models/project.model');
const Task = require('./../models/task.model');

class ProjectController {

  async findByUser(req, res) {
    let status = 200, data = {};

    try {
      data = await Project.find({ owner: req.user._id }).exec();
      if (!data) {
        status = 204;
      }

    } catch (error) {
      console.log(error);
      status = error.status || 500;
      data.error = error.message;

    } finally {
      return res.status(status).json(data);
    }
  }

  async findById(req, res) {
    let status = 200, data = {};

    try {
      data = await Project.findOne({ _id: req.params.id, owner: req.user._id });
      if (!data) {
        status = 204;
      }

    } catch (error) {
      console.log(error);
      status = error.status || 500;
      data.error = error.message;

    } finally {
      return res.status(status).json(data);
    }
  }

  async store(req, res) {
    let status = 200, data = {};

    try {
      const project = new Project({
        title: req.body.title,
        owner: req.user._id,
      });

      await project.save();

      data = project;
      status = 201;

    } catch (error) {
       // Error handling
      console.log(error);
      status = error.status || 500;
      data.error = error.message;

    } finally {
      return res.status(status).json(data);
    }
  }

  async update(req, res) {
    let status = 200, data = {};

    try {
      const find = { _id: req.params.id, owner: req.user._id };
      const project = await Project.findOneAndUpdate(find, req.body, { new: true });

      if (!project) {
        throw { status: 400, message: 'Project not found' };
      }

      // Return updated project
      data = project

    } catch (error) {
      // Error handling
      console.log(error);
      status = error.status || 500;
      data.error = error.message;

    } finally {
      return res.status(status).json(data);
    }
  }

  async delete(req, res) {
    let status = 200, data = {};

    try {
      const find = { _id: req.params.id, owner: req.user._id };
      const project = Project.findOne(find);
      if (!project) {
        throw { status: 400, message: 'No project found' };
      }

      // TODO Verify mongoose
      await Task.deleteMany({ project: project._id });
      await Project.findOneAndDelete(find);

      status = 204;
      data = { message: 'Project removed' }

    } catch (error) {
      // Error handling
      console.log(error);
      status = error.status || 500;
      data.error = error.message;

    } finally {
      return res.status(status).json(data);
    }
  }
}

module.exports = new ProjectController();
