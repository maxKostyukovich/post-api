'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    CreditCardId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        key: 'id',
        model: 'Credit_cards',
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        key: 'id',
        model: 'Users',
      },
    },
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
    Account.belongsTo(models.Credit_card, { foreignKey: 'CreditCardId' } );
    Account.belongsTo(models.User, { foreignKey: 'UserId' });
    Account.hasMany(models.Post, { onDelete: 'CASCADE', hooks: true });
    Account.hasMany(models.Comment, { onDelete: 'CASCADE', hooks: true });
  };
  return Account;
};