const bcrypt = require('bcrypt');

const isEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

const isPasswordOk = (user, password) => {
  return bcrypt.compareSync(password, user.password)
}

module.exports = {
  isEmail,
  isPasswordOk,
};
