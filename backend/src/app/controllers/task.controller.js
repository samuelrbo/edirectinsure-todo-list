const Task = require('./../models/task.model');

class TaskController {

  async store(req, res) {
    const { isValid, message, status } = this.validate(req);

    if (!isValid) {
      return res.status(status || 400).json({ message });
    }

    const data = await Task.create(req.body.data);
    return res.json({ data });
  }

  async update(req, res) {
    return res.status(501).json({ message: 'Not implemented, yet' });
  }

  async delete(req, res) {
    return res.status(501).json({ message: 'Not implemented, yet' });
  }

  async validate(req) {
    let isValid = false;
    let message = 'Not implemented, yet';
    let status = 501;

    return { isValid, message, status };
  }
}

module.exports = new TaskController();
