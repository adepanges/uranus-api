'use strict';
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		uuid: DataTypes.UUIDV4,
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		email: DataTypes.STRING,
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		bio: DataTypes.TEXT,
		birthday: DataTypes.DATE,
	}, {});

	User.beforeCreate((user, _) => {
		return user.uuid = uuid();
	});

	User.associate = function(models) {
	// associations can be defined here
	};

	return User;
};