const Sequelize = require('sequelize');

module.exports = (lat, lng) => {
  return Sequelize.fn('ST_GeomFromText', `POINT(${lat} ${lng})`);
};
