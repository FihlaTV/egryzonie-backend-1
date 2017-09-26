module.exports = (sequelize, DataTypes) => {
  const Vet = sequelize.define('Vet', {
    title: DataTypes.STRING,
    gmapsposition: DataTypes.STRING,
    rodents: DataTypes.BOOLEAN,
    websiteUrl: DataTypes.STRING,
    accepted: DataTypes.BOOLEAN
  });

  return Vet;
};
