module.exports = (sequelize, DataTypes) => {
    return sequelize.define('product', {
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(150)
        },
        limit: {
            type: DataTypes.INTEGER
        }
    })
}