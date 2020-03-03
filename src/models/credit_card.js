'use strict';
module.exports = (sequelize, DataTypes) => {
  const Credit_card = sequelize.define('Credit_card', {
    card_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiration_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cvv_card: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AccountId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        key: 'id',
        model: 'Accounts',
      },
    },
  }, {});
  Credit_card.associate = function(models) {
      Credit_card.belongsTo(models.Account, { foreignKey: 'AccountId'});
  };
  return Credit_card;
};