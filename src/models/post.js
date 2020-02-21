'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    AccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        key: 'id',
        model: 'Accounts',
      }
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.STRING,
    mainImg: DataTypes.STRING,
    topic: DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.Account, { foreignKey: 'AccountId' });
    Post.hasMany(models.Comment, { foreignKey: 'PostId',onDelete: 'CASCADE', hooks: true })
  };
  return Post;
};