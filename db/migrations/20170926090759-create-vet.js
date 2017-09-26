module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Vets', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    gmapsposition: {
      type: Sequelize.STRING
    },
    rodents: {
      type: Sequelize.BOOLEAN
    },
    websiteUrl: {
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
  }),
  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable('Vets')
};
