const baseRepository = require('./../base');
var userRepository = new baseRepository('sequelize', 'User');

module.exports = userRepository;
