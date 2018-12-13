'use strict';

module.exports = (sequelize, DataTypes) => {
    const ModuleChannel = sequelize.define(
        'Module_channel',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            module_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            domain: DataTypes.STRING,
            name: DataTypes.STRING,
            desc: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            paranoid: true,
            timestamps: true
        }
    );

    ModuleChannel.associate = models => {
        // associations can be defined here
    };

    return ModuleChannel;
};
