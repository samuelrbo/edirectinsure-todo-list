const Task = require('./../models/task.model');
const Project = require('./../models/project.model');
const { verifyProject } = require('./../utils/validators');

class TaskController {

  /**
   * React-Admin
   *
   * GET_LIST:
   *   sort=['title','ASC']&range=[0, 24]&filter={title:'bar'}
   *
   * GET_MANY:
   *   filter={ids:[123,456,789]}
   *
   * GET_MANY_REFERENCE:
   *   filter={author_id:345}
   */
  async find(req, res) {
    let status = 200, data = {};

    try {
      const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
      if (!filter.project_id) {
        throw { status:400, message: 'No project available' };
      }

      const range = req.query.range ? eval(req.query.range) : [0,9];

      let [ field, criteria ] = req.query.sort ? eval(req.query.sort) : [ 'createdAt', 'DESC' ];
      if (field === 'id') {
        field = '_id';
      }
      let sort = criteria === 'ASC' ? `${field}` : `-${field}`;

      const from = range[0];
      const end = range[1];
      const size = (end - from) + 1;

      const project = await Project.findOne({ _id: filter.project_id, owner: req.user._id });
      const total  = project.tasks.length;

      data = await Task.find({ _id: project.tasks })
        .limit(size).skip(from)
        .sort(sort).exec();

      if (!data) {
        status = 204;
      }

      res.set({ 'Content-Range': `project ${from}-${end}/${total}` });

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
      data = Task.findById(req.params.id);

    } catch (error) {
      // Error handling
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
      let project;
      if (req.params.projectId) {
        project = await verifyProject(req, Project);
        const taskExistsInProject = project.tasks.find(t => t.toString() === req.params.id);
        if (!taskExistsInProject) {
          throw { status: 400, message: 'Task not found in project' };
        }

      } else {
        const task = await Task.findById(req.params.id);
        if (!task) {
          throw { status: 400, message: 'Task not found in project' };
        }

        project = await Project.findOne({ tasks: { $in: [task._id] } });
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
