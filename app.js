const express = require('express');
const bodyParser = require('body-parser');
const consoleLogger = require('morgan');
const http = require('http');
const cors = require('cors');
const log4js = require('log4js');
log4js.configure({
  appenders: {
    general: {
      filename: 'logs/general.log',
      type: 'file'
    }
  },
  categories: {
    default: {
      appenders: ['general'],
      level: 'all'
    }
  }
});

const app = express();
const env = process.env.NODE_ENV || 'development';
const logger = log4js.getLogger('general');
logger.level = 'ALL';
logger.info(env);

app.use(cors());
app.use(consoleLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', (req, res) =>
  res.status(200).send({ message: 'Welcome to eGryzonie API.' })
);

const server = http.createServer(app);
const models = require('./server/models');

logger.debug(models);

models.sequelize.sync({ force: true })
  .then(() => {
    // Spacer :)
    console.log('');
    if (env === 'development') {
      server.listen(3000);
      console.log('Server running on port 3000...');
    } else {
      server.listen();
      console.log('Server running...');
    }
  });
