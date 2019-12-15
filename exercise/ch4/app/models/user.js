'use strict'
module.exports = (sequelize, DataTypes) => {
  const attributes = {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: {
          args: /^[a-z0-9\_\-]+$/i,
          msg: 'Username can only contain alphanumerical characters.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email.'
        }
      }
    },
    password: {
      type: DataTypes.STRING
    }
  }
  const User = sequelize.define('User', attributes)
  return User
}
