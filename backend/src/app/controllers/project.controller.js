const Project = require('./../models/project.model');

class ProjectController {

  async findByUser(req, res) {
    const user = req.user;

    return res.status(501).json({ message: 'Not implemented, yet' });
  }

  async findById(req, res) {
    const data = await Project.findOne({ _id: req.params.id, owner: req.user._id });
    return data ? res.json(data) : res.status(204).send({ message: 'No data found to display.' });
  }

  async store(req, res) {
    const { isValid, message, status } = this.validate(req);

    if (!isValid) {
      return res.status(status || 400).json({ message });
    }

    const saveData = req.body.data;
    saveData.owner = req.user._id;

    const data = await Project.create(saveData);
    return res.json(data);
  }

  async update(req, res) {
    const data = await Project.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { $set: req.body.data },
      { new: true },
      (err) => {
        if (err) {
          return res.status(400).json({ message: err });
        }
      }
    );

    await data.save();

    return res.json(data);
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

module.exports = new ProjectController();
