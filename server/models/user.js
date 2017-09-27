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
  });

  User.beforeSave((user, options) =>
    bcrypt.hash(user.password, 10,
      (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        return next();
      }
    )
  );

  return User;
};
