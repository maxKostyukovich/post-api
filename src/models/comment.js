'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        key: 'id',
        model: 'Posts',
      }
    },
    AccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        key: 'id',
        model: 'Accounts',
      }
    },
    text: DataTypes.STRING,
    date: {
      type: DataTypes.STRING,
    }
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.Post, { foreignKey: 'PostId', onDelete: 'CASCADE' });
    Comment.belongsTo(models.Account, { foreignKey: 'AccountId' });
  };
  return Comment;
};