module.exports = (sequelize, DataTypes) => {
  const Vet = sequelize.define('Vet', {
    title: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    googleMapsID: DataTypes.STRING,
    rodents: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    websiteUrl: DataTypes.STRING,
    phone: DataTypes.STRING(15),
    accepted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['title', 'city']
      }
    ]
  });

  Vet.associate = (models) => {
    Vet.belongsTo(models.User, { as: 'suggestedBy' });
    Vet.belongsTo(models.User, { as: 'acceptedBy' });
  };

  return Vet;
};
