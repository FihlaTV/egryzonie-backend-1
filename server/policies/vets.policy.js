const { Vet } = require('../models');

module.exports = {
  async suggest (req, res, next) {

    // Check if required fields are present
    const requiredFields = ['title', 'address', 'googleMapsID', 'lat', 'lng'];
    requiredFields.forEach((item) => {
      if (!req.body[item]) {
        res.status(400).json({ message: 'Nazwa, adres, google ID oraz pozycja są wymagane.' });
      }
    });

    if (req.body['phone']) {
      if (!/^[0-9+ -\(\)]{7,15}$/.test(req.body['phone'])) {
        res.status(400).json({ message: 'Numer telefonu jest nieprawidłowy.' });
      }
    }

    try {
      // Check for duplicate
      const vets = await Vet.findOne({ where: { title: req.body.title } });
      if (vets) {
        res.status(400).json({ message: `${req.body.title} już istnieje lub ktoś już zasugerował jego dodanie.` });
      }
    } catch (getError) {
      console.error('Get error: ', getError);
      res.status(400).json({ error: error });
    }

    next();
  },

  async acceptSuggestion (req, res, next) {
    const { vetId } = req.params;
    try {
      const vet = await Vet.findById(vetId);
    } catch (vetError) {
      console.error('Error: ', vetError);
      res.status(400).json({ error: error });
    }
  }
};
