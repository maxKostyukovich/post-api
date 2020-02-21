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
    }
  }, {});
  Credit_card.associate = function(models) {
      Credit_card.hasOne(models.Account);
  };
  return Credit_card;
};