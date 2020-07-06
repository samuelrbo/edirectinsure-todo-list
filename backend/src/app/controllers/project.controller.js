const Project = require('./../models/project.model');
const Task = require('./../models/task.model');

class ProjectController {

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
  async findByUser(req, res) {
    let status = 200, data = {};
    const filter = req.query.filter ? req.query.filter : {};
    const range = req.query.range ? eval(req.query.range) : [0,9];

    let [ field, criteria ] = req.query.sort ? eval(req.query.sort) : [ 'createdAt', 'DESC' ];
    if (field === 'id') {
      field = '_id';
    }
    let sort = criteria === 'ASC' ? `${field}` : `-${field}`;

    const from = range[0];
    const end = range[1];
    const size = (end - from) + 1;

    try {
      data = await Project.find({ owner: req.user._id })
        .limit(size).skip(from)
        .sort(sort)
        .populate('tasks').exec();

      if (!data) {
        status = 204;
      }

      const total  = await Project.countDocuments({ owner: req.user._id });
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
      data = await Project.findOne({ _id: req.params.id, owner: req.user._id }).populate('tasks');
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

      await Project.remove(find);

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
