const Task = require('./../models/task.model');
const Project = require('./../models/project.model');

class TaskController {

  async store(req, res) {
    let status = 200, data = {};

    try {
      const project = this.verifyProject(req);

      data = req.body;
      data.project = project;

      const task = new Task(req.body);
      await task.save();

      data = task;

      project.tasks.push(task);
      await project.save();

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
      const project = this.verifyProject(req);
      const find = { _id: req.param.id, project: project._id };
      const task = await Task.findOneAndUpdate(find, req.body, { new: true });

      if (!task) {
        throw { status: 400, message: 'Task not found' };
      }

      // Return updated project
      data = task

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
      this.verifyProject(req);
      await Task.findOneAndDelete({ _id: req.param.id, project: project._id });

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

  async verifyProject(req) {
    const project = await Project.findOne({ _id: req.params.projectId, owner: req.user._id });
    if (!project) {
      throw { status = 204, message: 'No project found' };
    }

    return project;
  }
}

module.exports = new TaskController();
