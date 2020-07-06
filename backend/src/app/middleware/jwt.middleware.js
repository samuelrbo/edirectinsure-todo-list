const jwt = require('jsonwebtoken');

const unprotectedPaths = ['register', 'login'];

module.exports = async (req, res, next) => {
  const isUnprotectedPath = unprotectedPaths.filter(p => req.path.endsWith(p));

  if (!isUnprotectedPath || isUnprotectedPath.length == 0) {
    const header = req.headers['x-access-token'] || req.headers['authorization'];
    if (!header) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const auth = header ? header.split(' ') : null;

    if (auth && auth.length == 2 && auth[0] === 'Bearer') {
      const token = auth[1];

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        decoded.token = token;
        req.user = decoded;

        next();

      } catch (err) {
        console.log(err);
        return res.status(401).json({ message: 'Unauthorized' });
      }
    }

  } else {
    next();
  }
};
