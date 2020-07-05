const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const hash = (password) => {
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  return bcrypt.hashSync(password, salt);
}

module.exports = {
  hash,
}
