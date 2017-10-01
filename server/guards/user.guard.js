const jwt = require('jsonwebtoken');
const { secret } = require('../config/config.json');

module.exports = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(403).json({ message: 'Nieprawidłowe dane logowania.' });
      }
      req.decoded = decoded;
      next();
      return true;
    });
  } else {
    return res.status(403).json({ message: 'Brak tokena' });
  }
  return false;
};
