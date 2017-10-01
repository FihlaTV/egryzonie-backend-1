const { User } = require('../models');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config.json');
const guards = require('../guards');

const checkPassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash,
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
  });
};

module.exports = {
  async create (req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
      console.error('Error creating new User: ', error);
      res.status(400).json({ message: 'Wystąpił błąd podczas tworzenia użytkownika.', errorCode: 'antique' });
    }
  },

  async login (req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        res.status(401).json({ message: 'Użytkownik o takim adresie e-mail nie istnieje.' });
        return;
      }

      const passwordValidation = await checkPassword(password, user.password);
      if (!passwordValidation) {
        res.status(401).json({ message: 'Nieprawidłowe hasło.' });
        return;
      }

      const token = jwt.sign({ user: user }, secret, { expiresIn: 60 * 60 * 24 });
      res.json({ message: 'Pomyślnie zalogowano.', token: token });
    } catch (error) {
      console.error('Error during authentication (1): ', error);
      res.status(400).json({ message: 'Wystąpił błąd podczas logowania.', errorCode: 'junior' });
    }
  },

  checkLogin (req, res) {
    return res.status(200).json({ message: 'Login correct' });
  }
};
