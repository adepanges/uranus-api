const router = require('express').Router();

module.exports = [
    router.use('/instance', require('./instance')),
    router.use('/module', require('./module')),
    router.use('/user', require('./user'))
];
