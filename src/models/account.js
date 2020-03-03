'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Account.associate = function(models) {
    Account.hasOne(models.User);
    Account.hasOne(models.Credit_card);
    Account.hasMany(models.Post, { onDelete: 'CASCADE', hooks: true });
    Account.hasMany(models.Comment, { onDelete: 'CASCADE', hooks: true });
  };
  return Account;
};