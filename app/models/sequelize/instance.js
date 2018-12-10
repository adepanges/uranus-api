'use strict';

module.exports = (sequelize, DataTypes) => {
    const Instance = sequelize.define(
        'Instance',
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
                    msg: 'Code is alredy used other instance'
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            paranoid: true,
            timestamps: true
        }
    );

    Instance.associate = models => {
        // associations can be defined here
    };

    return Instance;
};
