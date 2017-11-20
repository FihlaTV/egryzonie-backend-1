const { Vet } = require('../models');
const positionHelper = require('../helpers/position.helper');

module.exports = {
  // Public - lista weterynarzy
  async index (req, res) {
    console.log('USER: ', req.user);
    const limit = req.params['limit'] || 10;
    const offset = req.params['offset'] || 0;
    try {
      const vets = await Vet.all({ limit: limit, offset: offset });
      res.json(vets);
    } catch (error) {
      res.status(400).json({ message: 'Wystąpił błąd podczas pobierania danych weterynarzy.', errorCode: 'raven' });
    }
  },

  async searchWithinRange (req, res) {
    const { range, lat, lng } = req.params || 50000;
    try {
      const attributes = ['id', 'title', 'address', 'googleMapsID', 'position'];
      const vets = await Vet.findWithinRange(Number(range), lat, lng, attributes);
      res.json(vets);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  },

  // Public - szczegóły weterynarza
  async view (req, res) {
    const { vetId } = req.params;
    if (!Number(vetId)) {
      res.status(400).json({ message: 'Nieprawidłowe ID placówki.' });
    }

    try {
      const vet = await Vet.findOne({ where: { id: vetId } });
      if (!vet) {
        res.status(404).json({ message: 'Nie znaleziono takiego weterynarza.' });
      }
      res.status(200).json(vet);
    } catch (error) {
      res.status(400).json({ message: 'Wystąpił błąd podczas pobierania informacji o weterynarzu.', errorCode: '' });
    }
  },

  // User - zasugeruj nowego weterynarza
  async suggest (req, res) {
    const { vet, lat, lng } = req.body;

    req.body.position = positionHelper(lat, lng);

    try {
      const newVet = await Vet.create(req.body);
      res.status(203).json(newVet);
    } catch (error) {
      res.status(400).json({ message: 'Wystąpił błąd podczas tworzenia sugestii weterynarza.', errorCode: 'empirical' });
    }
  },

  // Moderator - zatwierdź zasugerowanego weterynarza
  async acceptSuggestion (req, res) {
    const { vetId } = req.body;
    try {
      const vet = await Vet.update(
        { accepted: true },
        { where: { id: vetId } }
      );
    } catch (error) {
      console.error('Update Error: ', error);
      res.status(400).json({ message: 'Wystąpił błąd podczas aktualizacji danych weterynarza.', errorCode: '' });
    }
  }
};
