module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        is_host: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        bio: {
            type: DataTypes.TEXT
        },
        profile_image: {
            type: DataTypes.STRING(100)
        },
        login_method: {
            type: DataTypes.STRING(30)
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