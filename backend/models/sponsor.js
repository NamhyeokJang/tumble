module.exports = (sequelize, DataTypes) => {
    return sequelize.define('sponsor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        donation: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('now()'),
        },
    }, {
        timestamps: false,
    });
};