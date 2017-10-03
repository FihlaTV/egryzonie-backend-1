module.exports = (app, auth) => {
  const payload = { app: app, auth: auth };
  app.use('/auth', require('./auth.routes')(payload));
  app.use('/vets', require('./vets.routes')(payload));
};
