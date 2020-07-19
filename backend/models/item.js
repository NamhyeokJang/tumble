module.exports = (sequelize, DataTypes) => {
    return sequelize.define('product', {
        name: {
            type: DataTypes.STRING(150)
        },
        quantity: {
            type: DataTypes.INTEGER
        }
    })
}