const vets = require('./vets.routes');

module.exports = (app) => {
  app.use('/vets', vets);
};
