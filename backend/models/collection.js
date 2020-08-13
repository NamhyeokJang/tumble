'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('collection', {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        cover: {
            type: DataTypes.STRING(140),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(250)
        }
    })
}