const vets = require('./vets.routes');
const auth = require('./auth.routes');

module.exports = (app) => {
  app.use('/vets', vets);
  app.use('/auth', auth);
};
