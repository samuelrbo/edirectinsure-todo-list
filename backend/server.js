require('dotenv-safe').config({ silent: true });

const APP_NAME = '[API] EDirectInsure - TODO List';
const PORT = 8001;

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const api = require('./src/api');

if (cluster.isMaster) {
  console.log('====================================================');
  console.log(`APP  : ${APP_NAME}`);
  console.log(`PORT : ${PORT}`);
  console.log('====================================================');
  console.log('Rodando processador MASTER');

  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died: ${code}`);
    console.log(`Signal: ${signal}`);
    console.log('Iniciando um novo worker');

    cluster.fork();
  });

} else {
  api.listen(PORT, '0.0.0.0', () => {
    console.log(`Rodando processo ${cluster.isMaster ? 'master' : 'child'}!`);
  });
}
