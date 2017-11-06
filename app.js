const express = require('express');
const bodyParser = require('body-parser');
const consoleLogger = require('morgan');
const http = require('http');
const cors = require('cors');
const passport = require('passport');
const auth = require('./server/auth')();

const app = express();
const env = process.env.NODE_ENV || 'development';

const { secret } = require('./server/config/config.json');
app.set('secret', secret);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(auth.initialize());

require('./server/routes')(app, auth);
app.get('/ENV', (req, res) =>
  res.status(200).send({ message: `Environment: ${env}` })
);
app.get('*', (req, res) =>
  res.status(200).send({ message: 'Welcome to eGryzonie API.' })
);

const server = http.createServer(app);
const models = require('./server/models');

// Just a test

models.sequelize.sync({ force: true })
  .then(() => {
    if (env === 'development') {
      server.listen(3000);
      console.log('Server running on port 3000...');
    } else {
      server.listen();
      console.log('Server running...');
    }
  });
