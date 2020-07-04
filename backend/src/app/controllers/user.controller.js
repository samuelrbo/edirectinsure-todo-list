const jwt = require('jsonwebtoken');
const User = require('./../models/user.model');
const { isPasswordOk } = require('./../utils/validators');

class UserController {

  async register(req, res) {
    let status = 200, data = {};

    try {
      const exists = await User.findOne({ email: req.body.email });
      console.log(exists);

      if (exists) {
        throw { status: 400, message: 'Email already in use' };
      }

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      await user.save();

      data = user;
      status = 201;

    } catch (error) {
      console.log(error);
      status = error.status || 500;
      data.error = error.message;

    } finally {
      return res.status(status).json(data);
    }
  }

  async login(req, res) {
    let status = 200, data = {};

    try {
      const user = await User.findOne({ email: req.body.email }).exec();
      if (!user) {
        throw { status: 400, message: 'User or password is invalid' };
      }

      const isValidPasss = isPasswordOk(user, req.body.password);
      if (!isValidPasss) {
        throw { status: 400, message: 'User or password is invalid' };
      }

      data = { _id: user._id, name: user.name, email: user.email };
      const token = jwt.sign(data, process.env.JWT_SECRET);
      data.token = token;

    } catch (error) {
      console.log(error);
      status = error.status || 500;
      data.error = error.message;

    } finally {
      return res.status(status).json(data);
    }
  }

  async logged(req, res) {
    return res.json(req.user);
  }

  async update(req, res) {
    let status = 200, data = {};

    try {
      const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
      if (!user) {
        throw { status: 400, message: 'User not found' };
      }

      data = user

    } catch (error) {
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
      if (req.user._id !== req.params.id) {
        throw { status: 401, message: 'Unautorized' };
      }

      await User.findOneAndDelete({ _id: req.params.id });

      status = 204;
      data = { message: 'User removed' }

    } catch (error) {
      console.log(error);
      status = error.status || 500;
      data.error = error.message;

    } finally {
      return res.status(status).json(data);
    }
  }
}

module.exports = new UserController();
