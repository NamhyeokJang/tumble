module.exports = (sequelize, DataTypes) => {
    return sequelize.define('compose', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    }, {
        timestamps: false,
    });
};