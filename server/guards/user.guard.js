const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { secret } = require('../config/config.json');

module.exports = (req, res, next) => {
  const { role } = req.user;

  if (!role || role !== 'user') {
    return res.status(401).json({ message: 'Nie masz dostępu do tego miejsca.' });
  }

  return next();
};
