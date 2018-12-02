const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	firstname: String,
	lastname: String,
	birthday: Date
}, {
	timeStamps: true,
});

module.exports = mongoose.model('User', UserSchema);