const baseRepository = require('./../base');
var moduleRepository = new baseRepository('sequelize', 'Module');

moduleRepository.moduleChannelRepository = require('./module_channel');
moduleRepository.availableAttributes = ['id', 'code', 'name', 'desc', 'status'];
module.exports = moduleRepository;
