const { Vet } = require('../models');

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

  // Public - lista weterynarzy w wybranym mieście
  async searchByCity (req, res) {
    const { city } = req.body;
    if (!city) {
      res.json([]);
    }
    try {
      const vets = await Vet.findAll({
        where: { 'city': city },
        limit: 10
      });
      res.status(203).json(vets);
    } catch (error) {
      res.status(400).json({ message: `Wystąpił błąd podczas wyszukiwania weterynarzy z miasta ${city}.`, errorCode: '' });
    }
  },

  // Public - lista po nazwie
  async searchByTitle (req, res) {
    const { places } = req.body;
    if (!places) {
      res.json([]);
    }
    try {
      const vets = await Vet.findAll({
        where: { 'title': { in: places } },
        limit: 10
      });
      res.status(203).json(vets);
    } catch (error) {
      res.status(400).json({ message: 'Wystąpił błąd podczas wyszukiwania pobliskich weterynarzy.', errorCode: '' });
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
      res.statjs(400).json({ message: 'Wystąpił błąd podczas pobierania informacji o weterynarzu.', errorCode: '' });
    }
  },

  // User - zasugeruj nowego weterynarza
  async suggest (req, res) {
    try {
      const vet = await Vet.create(req.body);
      res.status(203).json(vet);
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
