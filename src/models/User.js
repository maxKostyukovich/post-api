module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING
        },
        AccountId: {
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            references: {
                key: 'id',
                model: 'Accounts',
            },
        },
    });
    User.associate = function (models) {
        User.belongsTo(models.Account, { foreignKey: 'AccountId' })
    };
    return User;
};