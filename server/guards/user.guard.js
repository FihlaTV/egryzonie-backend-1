const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { secret } = require('../config/config.json');

module.exports = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, async (error, decoded) => {
      if (error) {
        return res.status(403).json({ message: 'Nieprawidłowe dane logowania.' });
      }

      req.userId = decoded.user.id;
      const dbUser = await User.findById(req.userId);
      if (!dbUser) {
        return res.status(403).json({ message: 'Użytkownik nie istnieje.' });
      }

      next();
      return true;
    });
  } else {
    return res.status(403).json({ message: 'Logowanie nieprawidłowe.' });
  }
  return false;
};
