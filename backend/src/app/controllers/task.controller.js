const Task = require('./../models/task.model');
const Project = require('./../models/project.model');
const { verifyProject } = require('./../utils/validators');

class TaskController {

  async store(req, res) {
    let status = 200, data = {};

    try {
      const project = await verifyProject(req, Project);

      const task = new Task(req.body);
      await task.save();

      data = task;

      project.tasks.push(task._id);
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
      await verifyProject(req, Project);
      const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
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
      const project = await verifyProject(req, Project);
      const taskExistsInProject = project.tasks.find(t => t.toString() === req.params.id);
      if (!taskExistsInProject) {
        throw { status: 400, message: 'Task not found in project' };
      }

      await Task.findOneAndDelete({ _id: req.params.id });

      project.tasks = project.tasks.filter(t => t.toString() != req.params.id);

      await project.save();

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

module.exports = new TaskController();
