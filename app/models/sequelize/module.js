'use strict';

module.exports = (sequelize, DataTypes) => {
    const Module = sequelize.define(
        'Module',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    name: 'code_UNIQUE',
                    msg: 'Code is alredy used other module'
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            desc: {
                type: DataTypes.STRING,
                allowNull: true
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        },
        {
            paranoid: true,
            timestamps: true
        }
    );

    Module.associate = models => {
        // associations can be defined here
    };

    return Module;
};
