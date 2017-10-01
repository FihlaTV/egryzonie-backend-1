const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      afterCreate: (user, options) => {
        bcrypt.hash(user.password, null, null,
          (err, hash) => {
            if (err) {
              console.error('Hashing error: ', err);
              throw err;
            }
            user.password = hash;
          });
      }
    }
  });

  return User;
};
