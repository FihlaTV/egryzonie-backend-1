const { Vet } = require('../models');

module.exports = {
  async index (req, res) {
    const limit = req.params['limit'] || 10;
    const offset = req.params['offset'] || 0;

    try {
      const vets = await Vet.all({ limit: limit, offset: offset });
      res.json(vets);
    } catch (error) {
      res.status(400).json({ message: 'There was an error getting Vets data.' });
    }
  }
};
