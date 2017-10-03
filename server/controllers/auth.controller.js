const { User } = require('../models');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const { jwtSecret } = require('../config/config.json').jwt;

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
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(401).json({ message: 'Nie ma takiego użytkownika.' });
      }
      const verifyPassword = await user.verifyPassword(password);
      if (!verifyPassword) {
        res.status(403).json({ message: 'Nieprawidłowe hasło.' });
      }
      const payload = { id: user.id };
      const token = jwt.encode(payload, jwtSecret);
      res.json({ token: token });
    } catch (error) {
      console.log('Login Error:', error);
      res.status(403).json({ message: 'Wystąpił błąd podczas logowania.', errorCode: '' });
    }
  },

  async user (req, res) {
    const userId = req.user.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        res.status(401).json({ message: 'Nieprawidłowe dane logowania.' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: 'Wystąpił błąd przy próbie weryfikacji logowania.', errorCode: '' });
    }
  }
};
