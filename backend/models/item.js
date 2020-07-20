module.exports = (sequelize, DataTypes) => {
    return sequelize.define('item', {
        name: {
            type: DataTypes.STRING(150)
        },
        quantity: {
            type: DataTypes.INTEGER
        }
    })
}