module.exports = (sequelize, DataTypes) => {
    return sequelize.define('project', {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        category: {
            type: DataTypes.STRING(30),
        },
        type: {
            type: DataTypes.STRING
        },
        deadLine: {
            type: DataTypes.DATE,
            allowNull: false
        },
        goal: {
            type: DataTypes.INTEGER
        },
        cover: {
            type: DataTypes.STRING(100)
        },
        story: {
            type: DataTypes.TEXT
        },
        delivery: {
            type: DataTypes.DATE
        }
    })
}