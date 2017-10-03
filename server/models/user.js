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
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        const hash = bcrypt.hashSync(user.password, null);
        console.log('HASH: ', hash);
        user.password = hash;
      }
    }
  });

  User.prototype.verifyPassword = function verifyPassword (password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, (error, isMatch) => {
        if (error) {
          reject(error);
        }

        resolve(isMatch);
      });
    });
  };

  return User;
};
