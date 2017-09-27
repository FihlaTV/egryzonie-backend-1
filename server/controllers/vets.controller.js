const { Vet } = require('../models');

module.exports = {
  async index (req, res) {
    const limit = req.params['limit'] || 10;
    const offset = req.params['offset'] || 0;

    try {
      const vets = await Vet.all({ limit: limit, offset: offset });
      res.json(vets);
    } catch (error) {
      res.status(400).json({ message: 'Wystąpił błąd podczas pobierania danych weterynarzy.', errorCode: 'raven' });
    }
  },

  async suggest (req, res) {
    try {
      const vet = await Vet.create(req.body);
      res.status(203).json(vet);
    } catch (error) {
      res.status(400).json({ message: 'Wystąpił błąd podczas tworzenia sugestii weterynarza.', errorCode: 'empirical' });
    }
  }
};
