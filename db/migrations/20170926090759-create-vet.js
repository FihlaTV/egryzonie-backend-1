module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Vets', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING
    },
    city: {
      allowNull: false,
      type: Sequelize.STRING
    },
    address: {
      allowNull: false,
      type: Sequelize.STRING
    },
    googleMapsID: {
      type: Sequelize.STRING
    },
    rodents: {
      type: Sequelize.BOOLEAN
    },
    websiteUrl: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    accepted: {
      type: Sequelize.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['title', 'city']
      }
    ]
  }),
  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('Vets')
};
