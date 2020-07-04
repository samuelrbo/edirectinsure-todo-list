require('./config/mongo');

const api = require('./config/server');
const routes = require('./config/routes');

api.use('/api/v1', routes);

// Root
api.get('/', (req, res) => res.json('TODO List'));

module.exports = api;
