'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            uuid: DataTypes.UUIDV4,
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    name: 'users_un_username',
                    msg: 'Username is used other user'
                }
            },
            password: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                unique: {
                    name: 'users_un_email',
                    msg: 'Email is used other user'
                },
                validate: {
                    isEmail: {
                        args: true,
                        msg: 'Email address must be valid'
                    }
                }
            },
            firstname: DataTypes.STRING,
            lastname: DataTypes.STRING,
            bio: DataTypes.TEXT,
            birthdate: DataTypes.DATE
        },
        {
            paranoid: true,
            timestamps: true
        }
    );

    User.beforeCreate((user, _) => {
        user.uuid = uuid();
        user.password = String(user.password).trim();
        user.username = String(user.username).toLowerCase();
        return user;
    });

    User.associate = function(models) {
        // associations can be defined here
    };

    return User;
};
