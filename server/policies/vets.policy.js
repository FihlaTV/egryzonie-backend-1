module.exports = {
  suggest (req, res, next) {
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

    next();
  }
};
