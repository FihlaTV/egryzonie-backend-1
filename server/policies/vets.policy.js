const { Vet } = require('../models');

module.exports = {
  async suggest (req, res, next) {
    // Check if required fields are present
    const requiredFields = ['title', 'city', 'address'];
    requiredFields.forEach((item) => {
      if (!req.body[item]) {
        res.status(400).json({ message: 'Nazwa, miasto oraz adres są wymagane.' });
      }
    });

    if (req.body['phone']) {
      if (!/^[0-9+ -\(\)]{7,15}$/.test(req.body['phone'])) {
        res.status(400).json({ message: 'Numer telefonu jest nieprawidłowy.' });
      }
    }

    // Check for duplicate
    const vets = await Vet.findOne({ where: { title: req.body.title, city: req.body.city } });
    if (vets) {
      res.status(400).json({ message: `${req.body.title} już istnieje w mieście ${req.body.city} lub ktoś już zasugerował jego dodanie.` });
    }

    next();
  }
};
