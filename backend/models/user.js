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
        isHost: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        bio: {
            type: DataTypes.TEXT
        },
        profileImage: {
            type: DataTypes.STRING(100)
        },
        loginMethod: {
            type: DataTypes.STRING(30),
            defaultValue: 'email'
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