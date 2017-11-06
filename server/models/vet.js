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
    position: DataTypes.GEOMETRY('POINT'),
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

  Vet.findWithinRange = (range, lat, lng) => {
    return new Promise((resolve, reject) => {
      const attributes = Object.keys(Vet.attributes);
      const distanceAttribute = sequelize.fn(
        'ST_Distance_Sphere',
        sequelize.literal('position'),
        sequelize.literal(`ST_MakePoint(${lat}, ${lng})`)
      );
      const distanceAlias = [distanceAttribute, 'distance'];
      const query = {
        attributes: attributes,
        where: sequelize.where(distanceAttribute, { $lte: range }),
        logging: console.log
      };

      Vet.findAll(query)
        .then((instance) => resolve(instance))
        .catch((error) => reject(error));
    });
  };

  return Vet;
};
