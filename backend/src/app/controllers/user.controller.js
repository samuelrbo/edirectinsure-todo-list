const jwt = require('jsonwebtoken');
const User = require('./../models/user.model');
const { isPasswordOk } = require('./../utils/validators');
const { hash } = require('./../utils/password');

class UserController {

  /**
   * Method to register user
   *
   * @param {Request} req
   * @param {Response} res
   */
  async register(req, res) {
    let status = 200, data = {};

    try {
      const exists = await User.findOne({ email: req.body.email });
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

  /**
   * Method to loggin user
   *
   * @param {Request} req
   * @param {Response} res
   */
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

  /**
   * Mehtod to check user logged by token
   *
   * @param {Request} req
   * @param {Response} res
   */
  async logged(req, res) {
    return res.json(req.user);
  }

  /**
   * Method to update user data
   *
   * @param {Request} req
   * @param {Response} res
   */
  async update(req, res) {
    let status = 200, data = {};

    try {
      // User only can update himself
      if (req.user._id !== req.params.id) {
        throw { status: 401, message: 'Unautorized' };
      }

      // TODO Check Mongoose middleware to use for password hash
      if(req.body.password) {
        req.body.password = hash(req.body.password);
      }

      // Verifying if user exists with requested id and update with requested data
      const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
      if (!user) {
        throw { status: 400, message: 'User not found' };
      }

      // Return updated user
      data = user

    } catch (error) {
       // Error handling
      console.log(error);
      status = error.status || 500;
      data.error = error.message;

    } finally {
      return res.status(status).json(data);
    }
  }

  /**
   * Methdo to delete user
   *
   * @param {Request} req
   * @param {Response} res
   */
  async delete(req, res) {
    let status = 200, data = {};

    try {
      // User only can delete himself
      if (req.user._id !== req.params.id) {
        throw { status: 401, message: 'Unautorized' };
      }

      // Verifying if id still exists for a user
      await User.findOneAndDelete({ _id: req.params.id });

      status = 204;
      data = { message: 'User removed' }

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

module.exports = new UserController();
