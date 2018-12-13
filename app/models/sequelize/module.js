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

    Module.includes = new Array();
    Module.associate = models => {
        // associations can be defined here

        // ------- module channel -------
        Module.hasMany(models.Module_channel, {
            foreignKey: 'module_id',
            as: 'channels'
        });
        Module.includes['channels'] = {
            model: models.Module_channel,
            availableAttributes: [
                'id',
                'module_id',
                'domain',
                'name',
                'desc',
                'created_at',
                'updated_at',
                'deleted_at'
            ],
            as: 'channels'
        };
        // ------- module channel -------
    };

    return Module;
};
