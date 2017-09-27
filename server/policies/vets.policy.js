module.exports = {
  suggest (req, res, next) {
    // Check if required fields are 
    const requiredFields = ['title', 'city', 'address'];
    requiredFields.forEach((item) => {
      if (!req.body[item]) {
        res.status(400).json({ message: 'Nazwa, miasto oraz adres są wymagane.' });
      }
    });

    next();
  }
};
