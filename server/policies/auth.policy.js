const { User } = require('../models');

module.exports = {
  async create (req, res, next) {
    const { name, email } = req.body;

    if (!/^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/.test(email)) {
      res.status(400).json({ message: 'Nieprawidłowy adres e-mail.' });
    }

    if (!/^[A-Za-z0-9\_\-]{4,32}$/.test(name)) {
      res.status(400).json({ message: 'Nieprawidłowa nazwa użytkownika.' });
    }

    try {
      const duplicate = await User.findOne({ where: [{ email: email }, { name: name }] });
      if (duplicate) {
        if (duplicate.email === email) {
          res.status(400).json({ message: 'Ten adres e-mail jest już w użyciu.' });
        }
        if (duplicate.name === name) {
          res.status(400).json({ message: 'Ta nazwa użytkownika jest już w użyciu.' });
        }
      }
    } catch (error) {
      console.log('Error finding duplicates: ', error);
      res.status(400).json({ message: 'Coś poszło nie tak podczas rejestracji.', errorCode: 'back' });
    }
    next();
  }
};
